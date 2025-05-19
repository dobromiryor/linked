import type {
  COMPANY_SIZE_FILTER,
  COMPANY_SIZES,
} from "@/constants/company-sizes.const";

export type CompanySize = (typeof COMPANY_SIZES)[number];

export type CompanySizeFilter = (typeof COMPANY_SIZE_FILTER)[number];
