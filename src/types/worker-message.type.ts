import type { CompanySearchState } from "@/interfaces/company-search-state.interface";

export type WorkerMessage =
  | {
      type: "filter";
      payload: Partial<
        Pick<CompanySearchState, "searchQuery" | "filters" | "sorting">
      >;
    }
  | {
      type: "pagination";
      payload: Pick<
        CompanySearchState,
        "filteredCompanies" | "currentPage" | "itemsPerPage"
      >;
    };
