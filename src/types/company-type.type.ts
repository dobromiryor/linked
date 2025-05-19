import type {
  COMPANY_TYPE_FILTER,
  COMPANY_TYPES,
} from "@/constants/company-types.const";

export type CompanyType = (typeof COMPANY_TYPES)[number];

export type CompanyTypeFilter = (typeof COMPANY_TYPE_FILTER)[number];
