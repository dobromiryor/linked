import { FilterBar } from "@/components/FilterBar";
import { Searchbar } from "@/components/Searchbar";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  return (
    <header>
      <nav className="flex items-center justify-between border-b">
        <div className="flex-1 container mx-auto flex items-center gap-2 md:gap-4 p-2 md:p-4">
          <div className="flex items-center gap-1 select-none">
            <span className="text-xl h-9 w-9 flex items-center justify-center">
              🔗
            </span>
            <span className="hidden md:block text-2xl font-bold">Linked</span>
          </div>
          <Searchbar />
          <ThemeToggle />
        </div>
      </nav>
      <FilterBar />
    </header>
  );
};
