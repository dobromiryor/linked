import { getJoinedCompanyData } from "@/data/mockData";
import { filterCompanies } from "@/lib/filter-companies.util";
import type { WorkerMessage } from "@/types/worker-message.type";
import type { WorkerResponse } from "@/types/worker-response.type";

const companies = getJoinedCompanyData();

self.onmessage = ({ data: { type, payload } }: MessageEvent<WorkerMessage>) => {
  if (!payload) return;

  switch (type) {
    case "filter": {
      const { filters, searchQuery, sorting } = payload;

      const filteredCompanies = filterCompanies(companies, {
        companySizeFilter: filters?.companySizeFilter,
        companyTypeFilter: filters?.companyTypeFilter,
        industryFilter: filters?.industryFilter,
        sortOrder: sorting?.sortOrder,
        sortBy: sorting?.sortBy,
        searchQuery,
      });

      self.postMessage({
        type: "filter",
        payload: filteredCompanies,
      } satisfies WorkerResponse);

      break;
    }

    case "pagination": {
      const { filteredCompanies, currentPage, itemsPerPage } = payload;

      const paginatedCompanies = filteredCompanies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

      self.postMessage({
        type: "pagination",
        payload: {
          paginatedCompanies,
          totalPages,
        },
      } satisfies WorkerResponse);

      break;
    }

    default: {
      console.error("Worker error: Invalid worker message type", {
        type,
        payload,
      });
      break;
    }
  }
};
