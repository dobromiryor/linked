import { MIN_SEARCH_QUERY_LENGTH } from "@/constants/min-search-query-length.const";
import { cn } from "@/lib/utils";
import {
  debouncedPostCompanyWorkerMessage,
  useCompanyStore,
} from "@/store/company.store";
import { Search, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";

export const Searchbar = () => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedCompany = useCompanyStore((state) => state.selectedCompany);
  const setSearchQuery = useCompanyStore((state) => state.setSearchQuery);

  const handleClear = () => {
    setValue("");
    searchInputRef.current?.focus();
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!isFocused && e.key === "/") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }

      if (isFocused && e.key === "Escape") {
        setValue("");
        searchInputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", down);

    return () => {
      document.removeEventListener("keydown", down);
    };
  }, [isFocused]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(value.length < MIN_SEARCH_QUERY_LENGTH ? "" : value);
      debouncedPostCompanyWorkerMessage({
        type: "filter",
        payload: { searchQuery: value },
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [value, setSearchQuery]);

  return (
    <div
      className={cn(
        "relative flex-1 transition-all transition-discrete starting:opacity-0 starting:-translate-y-4",
        selectedCompany && "opacity-0 -translate-y-4 pointer-events-none"
      )}
    >
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />

      <Input
        ref={searchInputRef}
        className="flex-1 px-8"
        placeholder={`Search companies`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={!!selectedCompany}
        aria-hidden={!!selectedCompany}
      />
      {value !== "" && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground select-none cursor-pointer"
          onClick={handleClear}
        >
          <XIcon className="size-4" />
        </button>
      )}
      {value === "" && (
        <span
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded border border-input text-sm font-medium leading-none text-muted-foreground select-none pointer-events-none transition-opacity",
            isFocused ? "opacity-50" : "opacity-100"
          )}
        >
          /
        </span>
      )}
    </div>
  );
};
