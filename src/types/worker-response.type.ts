import type { CompanySearchState } from "@/interfaces/company-search-state.interface";
import type { Company } from "@/interfaces/company.interface";

export type WorkerResponse =
  | { type: "filter"; payload: Company[] }
  | {
      type: "pagination";
      payload: Pick<CompanySearchState, "paginatedCompanies" | "totalPages">;
    };
