import { ITEMS_PER_PAGE } from "@/constants/items-per-page.const";
import { SORT_BY } from "@/constants/sort-by.const";
import { SORT_ORDER } from "@/constants/sort-order.const";
import type { CompanySearchState } from "@/interfaces/company-search-state.interface";
import type { WorkerMessage } from "@/types/worker-message.type";
import type { WorkerResponse } from "@/types/worker-response.type";
import debounce from "lodash.debounce";
import { create } from "zustand";

const worker = new Worker(
  new URL("@/workers/company.worker.ts?worker", import.meta.url),
  {
    type: "module",
  }
);

export const useCompanyStore = create<CompanySearchState>((set, get) => ({
  isLoading: true,

  filteredCompanies: [],
  paginatedCompanies: [],

  searchQuery: "",
  filters: {
    industryFilter: "all",
    companyTypeFilter: "all",
    companySizeFilter: "all",
  },

  sorting: {
    sortBy: SORT_BY[0],
    sortOrder: SORT_ORDER[0],
  },

  currentPage: 1,
  itemsPerPage: ITEMS_PER_PAGE[0],
  totalPages: 1,

  setSearchQuery: (searchQuery: string) => {
    set({
      searchQuery,
      isLoading: true,
      currentPage: 1,
    });
  },

  setFilter: (filter, value) => {
    set({
      filters: { ...get().filters, [filter]: value },
      isLoading: true,
    });
  },

  setSorting: (sorting) => {
    set({ sorting, isLoading: true });
  },

  setCurrentPage: (currentPage) => {
    set({ currentPage, isLoading: true });
  },

  setItemsPerPage: (itemsPerPage) => {
    set({ itemsPerPage, currentPage: 1, isLoading: true });
  },
}));

const applySearchAndFilters = (overrides: Partial<CompanySearchState>) =>
  useCompanyStore.setState((state) => {
    const { filteredCompanies, itemsPerPage } = {
      ...state,
      ...overrides,
    };

    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
    const paginatedCompanies = filteredCompanies.slice(0, itemsPerPage);

    return {
      ...state,
      ...overrides,
      filteredCompanies,
      currentPage: 1,
      totalPages,
      paginatedCompanies,
    };
  });

worker.onmessage = ({ data }: MessageEvent<WorkerResponse>) => {
  if (!data) return;

  const { type, payload } = data;

  switch (type) {
    case "filter": {
      applySearchAndFilters({ filteredCompanies: payload });
      break;
    }

    case "pagination": {
      useCompanyStore.setState(payload);
      break;
    }

    default: {
      console.error("State update error: Invalid worker message type", data);
      break;
    }
  }

  useCompanyStore.setState({
    isLoading: false,
  });
};

export const postCompanyWorkerMessage = ({ payload, type }: WorkerMessage) => {
  const { searchQuery, filters, sorting } = {
    ...useCompanyStore.getState(),
    ...payload,
  };

  switch (type) {
    case "filter": {
      worker.postMessage({
        type,
        payload: {
          searchQuery,
          filters,
          sorting,
        },
      });
      break;
    }

    case "pagination": {
      worker.postMessage({ type, payload });
      break;
    }

    default: {
      console.error("Post message error: Invalid worker message type", {
        type,
        payload,
      });
      break;
    }
  }
};

export const debouncedPostCompanyWorkerMessage = debounce(
  postCompanyWorkerMessage,
  300
);
