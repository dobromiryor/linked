import { Loading } from "@/components/Loading";
import { ITEMS_PER_PAGE } from "@/constants/items-per-page.const";
import {
  debouncedPostCompanyWorkerMessage,
  useCompanyStore,
} from "@/store/company.store";
import type { ItemsPerPage } from "@/types/items-per-page.type";
import {
  PageIndicator,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationItemsPerPage,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationUI,
} from "./ui/pagination";

export const Pagination = () => {
  const isLoading = useCompanyStore((state) => state.isLoading);
  const totalPages = useCompanyStore((state) => state.totalPages);
  const currentPage = useCompanyStore((state) => state.currentPage);
  const setCurrentPage = useCompanyStore((state) => state.setCurrentPage);
  const itemsPerPage = useCompanyStore((state) => state.itemsPerPage);
  const setItemsPerPage = useCompanyStore((state) => state.setItemsPerPage);
  const filteredCompanies = useCompanyStore((state) => state.filteredCompanies);

  const onItemsPerPageChange = (value: string) => {
    const itemsPerPage = Number.parseInt(value) as ItemsPerPage;

    if (ITEMS_PER_PAGE.includes(itemsPerPage)) {
      setItemsPerPage(itemsPerPage);
      debouncedPostCompanyWorkerMessage({
        type: "pagination",
        payload: {
          filteredCompanies,
          currentPage: 1,
          itemsPerPage,
        },
      });
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      debouncedPostCompanyWorkerMessage({
        type: "pagination",
        payload: {
          filteredCompanies,
          itemsPerPage,
          currentPage,
        },
      });
    }
  };

  return (
    <footer className="p-2 md:p-4 border-t">
      <PaginationUI className="container mx-auto">
        <PaginationItemsPerPage
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          totalItems={filteredCompanies.length}
        />
        <div className="flex items-center gap-2">
          <Loading />
          <PageIndicator currentPage={currentPage} totalPages={totalPages} />
          <PaginationContent>
            <PaginationItem
              className="hidden md:block"
              onClick={() => goToPage(1)}
            >
              <PaginationFirst disabled={currentPage === 1 || isLoading} />
            </PaginationItem>
            <PaginationItem onClick={() => goToPage(currentPage - 1)}>
              <PaginationPrevious disabled={currentPage === 1 || isLoading} />
            </PaginationItem>
            <PaginationItem onClick={() => goToPage(currentPage + 1)}>
              <PaginationNext
                disabled={currentPage === totalPages || isLoading}
              />
            </PaginationItem>
            <PaginationItem
              className="hidden md:block"
              onClick={() => goToPage(totalPages)}
            >
              <PaginationLast
                disabled={currentPage === totalPages || isLoading}
              />
            </PaginationItem>
          </PaginationContent>
        </div>
      </PaginationUI>
    </footer>
  );
};
