import type { Company } from "@/interfaces/company.interface";
import type { SortCompaniesOptions } from "@/interfaces/sort-companies-options.interface";
import { getProfitMargin } from "@/lib/get-profit-margin.util";

/**
 * Sorts companies based on the provided options.
 * @param companies The companies to sort.
 * @param options The options for sorting companies.
 * @param options.sortBy The sort by. Default: "name"
 * @param options.sortOrder The sort order. Default: "asc"
 * @returns The sorted companies.
 */
export const sortCompanies = (
  companies: Company[],
  options: SortCompaniesOptions = { sortBy: "name", sortOrder: "asc" }
): Company[] => {
  const { sortBy = "name", sortOrder = "asc" } = options;

  return [...companies].sort((a, b) => {
    const lastYear = (company: Company) =>
      company.financialData.sort((a, b) => b.year - a.year)[0];

    switch (sortBy) {
      case "name":
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case "foundedYear":
        return sortOrder === "asc"
          ? a.foundedYear - b.foundedYear
          : b.foundedYear - a.foundedYear;
      case "netIncome":
        return sortOrder === "asc"
          ? lastYear(a).netIncome - lastYear(b).netIncome
          : lastYear(b).netIncome - lastYear(a).netIncome;
      case "revenue":
        return sortOrder === "asc"
          ? lastYear(a).revenue - lastYear(b).revenue
          : lastYear(b).revenue - lastYear(a).revenue;
      case "profitMargin":
        return sortOrder === "asc"
          ? getProfitMargin(a) - getProfitMargin(b)
          : getProfitMargin(b) - getProfitMargin(a);
      default:
        return 0;
    }
  });
};
