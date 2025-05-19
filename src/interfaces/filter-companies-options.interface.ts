import type { CompanySize } from "@/types/company-size.type";
import type { CompanyType } from "@/types/company-type.type";
import type { Industry } from "@/types/industry.type";
import type { SortBy } from "@/types/sort-by.type";
import type { SortOrder } from "@/types/sort-order.type";

export interface FilterCompaniesOptions {
  searchQuery?: string;
  industryFilter?: Industry | "all";
  companyTypeFilter?: CompanyType | "all";
  companySizeFilter?: CompanySize | "all";
  sortOrder?: SortOrder;
  sortBy?: SortBy;
}
