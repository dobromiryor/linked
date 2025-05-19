import type { Company } from "@/interfaces/company.interface";
import type { CompanySizeFilter } from "@/types/company-size.type";
import type { CompanyTypeFilter } from "@/types/company-type.type";
import type { IndustryFilter } from "@/types/industry.type";
import type { ItemsPerPage } from "@/types/items-per-page.type";
import type { SortBy } from "@/types/sort-by.type";
import type { SortOrder } from "@/types/sort-order.type";

export interface FiltersConfig {
  industryFilter: IndustryFilter;
  companyTypeFilter: CompanyTypeFilter;
  companySizeFilter: CompanySizeFilter;
}

export interface SortingConfig {
  sortBy: SortBy;
  sortOrder: SortOrder;
}

export interface CompanySearchState {
  /* Loading state */
  isLoading: boolean;

  /* Data */
  filteredCompanies: Company[];
  paginatedCompanies: Company[];

  /* Search and filter state */
  searchQuery: string;
  filters: FiltersConfig;

  /* Sorting state */
  sorting: SortingConfig;

  /* Pagination state */
  currentPage: number;
  itemsPerPage: ItemsPerPage;
  totalPages: number;

  /* Actions */
  setSearchQuery: (searchQuery: string) => void;
  setFilter: (
    filter: keyof FiltersConfig,
    value: FiltersConfig[keyof FiltersConfig]
  ) => void;
  setSorting: (sorting: SortingConfig) => void;
  setCurrentPage: (currentPage: number) => void;
  setItemsPerPage: (itemsPerPage: ItemsPerPage) => void;
}
