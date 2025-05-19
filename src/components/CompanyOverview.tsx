import { CompanyList } from "@/components/CompanyList";
import { NoCompanies } from "@/components/NoCompanies";
import { useCompanyStore } from "@/store/company.store";
import { useEffect, useRef } from "react";

export const CompanyOverview = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const paginatedCompanies = useCompanyStore(
    (state) => state.paginatedCompanies
  );
  const isLoading = useCompanyStore((state) => state.isLoading);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [paginatedCompanies]);

  return (
    <div ref={containerRef} className="h-full flex-1 overflow-y-auto">
      {paginatedCompanies.length === 0 ? (
        <NoCompanies />
      ) : (
        <CompanyList companies={paginatedCompanies} isLoading={isLoading} />
      )}
    </div>
  );
};
