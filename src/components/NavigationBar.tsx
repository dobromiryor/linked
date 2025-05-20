import { FilterBar } from "@/components/FilterBar";
import { Searchbar } from "@/components/Searchbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useCompanyStore } from "@/store/company.store";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

export const Header = () => {
  const selectedCompany = useCompanyStore((state) => state.selectedCompany);
  const setSelectedCompany = useCompanyStore(
    (state) => state.setSelectedCompany
  );

  return (
    <header>
      <nav className="flex items-center justify-between border-b">
        <div className="flex-1 container mx-auto flex items-center gap-2 md:gap-4 p-2 md:p-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedCompany(null)}
            disabled={!selectedCompany}
            className={cn(
              "flex items-center justify-center transition-discrete starting:opacity-0 starting:-translate-x-4",
              !selectedCompany &&
                "hidden opacity-0 -translate-x-4 pointer-events-none"
            )}
          >
            <ChevronLeft />
            <span className="sr-only">Back to overview</span>
          </Button>
          <div className="flex items-center gap-1 select-none">
            <span className="text-xl h-9 w-9 flex items-center justify-center">
              🔗
            </span>
            <span
              className={cn(
                "text-2xl font-bold transition-all transition-discrete starting:opacity-0 starting:-translate-x-4",
                selectedCompany
                  ? "block opacity-100 translate-x-0"
                  : "hidden md:block"
              )}
            >
              Linked
            </span>
          </div>
          <Searchbar />
          <ThemeToggle />
        </div>
      </nav>
      {!selectedCompany && <FilterBar />}
    </header>
  );
};
