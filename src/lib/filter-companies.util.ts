import { MIN_SEARCH_QUERY_LENGTH } from "@/constants/min-search-query-length.const";
import type { Company } from "@/interfaces/company.interface";
import type { FilterCompaniesOptions } from "@/interfaces/filter-companies-options.interface";
import { sortCompanies } from "@/lib/sort-companies.util";

/**
 * Filters companies based on the provided options.
 * @param companies The companies to filter.
 * @param options The options for filtering companies.
 * @param options.searchQuery The search query.
 * @param options.industryFilter The industry filter.
 * @param options.companyTypeFilter The company type filter.
 * @param options.companySizeFilter The company size filter.
 * @param options.sortOrder The sort order. Default: "asc"
 * @param options.sortBy The sort by. Default: "name"
 * @returns The filtered companies.
 */
export const filterCompanies = (
  companies: Company[],
  {
    searchQuery = "",
    industryFilter = "all",
    companyTypeFilter = "all",
    companySizeFilter = "all",
    sortOrder = "asc",
    sortBy = "name",
  }: FilterCompaniesOptions
) => {
  let filtered = companies;

  /* Industry filter */
  if (industryFilter !== "all") {
    filtered = filtered.filter(
      (company) => company.industry === industryFilter
    );
  }

  /* Company type filter */
  if (companyTypeFilter !== "all") {
    filtered = filtered.filter(
      (company) => company.companyDetails.companyType === companyTypeFilter
    );
  }

  /* Company size filter */
  if (companySizeFilter !== "all") {
    filtered = filtered.filter(
      (company) => company.companyDetails.size === companySizeFilter
    );
  }

  /* Search */
  const query = searchQuery.toLowerCase();

  filtered = filtered.filter((company) => {
    if (searchQuery.length < MIN_SEARCH_QUERY_LENGTH) return true;

    const { companyDetails, financialData } = company;

    /* Search in company */
    if (
      company.id.toString().includes(query) ||
      company.name.toLowerCase().includes(query) ||
      company.industry.toLowerCase().includes(query) ||
      company.country.toLowerCase().includes(query) ||
      company.foundedYear.toString().includes(query)
    ) {
      return true;
    }

    /* Search in company details */
    if (
      companyDetails.companyType.toLowerCase().includes(query) ||
      companyDetails.size.toLowerCase().includes(query) ||
      companyDetails.ceoName.toLowerCase().includes(query) ||
      companyDetails.headquarters.toLowerCase().includes(query)
    ) {
      return true;
    }

    /* Search in financial data */
    return financialData.some(
      (data) =>
        data.year.toString().includes(query) ||
        data.revenue.toString().includes(query) ||
        data.netIncome.toString().includes(query)
    );
  });

  /* Sort */
  filtered = sortCompanies(filtered, { sortBy, sortOrder });

  return filtered;
};
