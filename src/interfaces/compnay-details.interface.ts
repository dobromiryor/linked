import type { CompanySize } from "@/types/company-size.type";
import type { CompanyType } from "@/types/company-type.type";

export interface CompanyDetailsMockData {
  companyId: number;
  companyType: CompanyType;
  size: CompanySize;
  ceoName: string;
  headquarters: string;
}
