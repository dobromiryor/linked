import { CompanyCard } from "@/components/CompanyCard";
import type { Company } from "@/interfaces/company.interface";
import { cn } from "@/lib/utils";

export const CompanyList = ({
  companies,
  isLoading,
}: {
  companies: Company[];
  isLoading: boolean;
}) => {
  return (
    <div
      className={cn(
        "container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 md:p-4 transition-all duration-200",
        isLoading && "opacity-50 blur-xs"
      )}
    >
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} onClick={() => {}} />
      ))}
    </div>
  );
};
