import type { CompanyDetailsMockData } from "@/interfaces/compnay-details.interface";
import type { FinancialDataMockData } from "@/interfaces/financial-data.interface";
import type { Industry } from "@/types/industry.type";

export interface CompanyMockData {
  id: number;
  name: string;
  country: string;
  industry: Industry;
  foundedYear: number;
}

export interface Company extends CompanyMockData {
  companyDetails: CompanyDetailsMockData;
  financialData: FinancialDataMockData[];
}
