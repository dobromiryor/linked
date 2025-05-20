import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMPANY_SIZE_FILTER } from "@/constants/company-sizes.const";
import { COMPANY_TYPE_FILTER } from "@/constants/company-types.const";
import { INDUSTRY_FILTER } from "@/constants/industries.const";
import { SORT_BY } from "@/constants/sort-by.const";
import { SORT_ORDER } from "@/constants/sort-order.const";
import type {
  CompanySearchState,
  FiltersConfig,
} from "@/interfaces/company-search-state.interface";
import {
  debouncedPostCompanyWorkerMessage,
  useCompanyStore,
} from "@/store/company.store";
import type { CompanySizeFilter } from "@/types/company-size.type";
import type { CompanyTypeFilter } from "@/types/company-type.type";
import type { IndustryFilter } from "@/types/industry.type";
import type { SortBy } from "@/types/sort-by.type";
import type { SortOrder } from "@/types/sort-order.type";

export const FilterBar = () => {
  const filters = useCompanyStore((state) => state.filters);
  const setFilter = useCompanyStore((state) => state.setFilter);
  const sorting = useCompanyStore((state) => state.sorting);
  const setSorting = useCompanyStore((state) => state.setSorting);

  const handleFilterChange = (
    filter: keyof CompanySearchState["filters"],
    value: FiltersConfig[keyof FiltersConfig]
  ) => {
    setFilter(filter, value);
    debouncedPostCompanyWorkerMessage({
      type: "filter",
      payload: { [filter]: value },
    });
  };

  const handleSortChange = (sortBy: SortBy, sortOrder: SortOrder) => {
    setSorting({ sortBy, sortOrder });
    debouncedPostCompanyWorkerMessage({
      type: "filter",
      payload: { sorting: { sortBy, sortOrder } },
    });
  };

  return (
    <div className="border-b">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 grid-flow-dense gap-2 md:gap-4 p-2 md:p-4">
        <Select
          value={filters.industryFilter}
          onValueChange={(value: IndustryFilter) =>
            handleFilterChange("industryFilter", value)
          }
        >
          <SelectTrigger className="flex-1 w-full col-span-2 md:col-span-1 data-[size=default]:h-8 md:data-[size=default]:h-9">
            <SelectValue placeholder="Filter by industry" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRY_FILTER.map((industry) => (
              <SelectItem key={`Industry__${industry}`} value={industry}>
                {industry === "all" ? "All industries" : industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.companyTypeFilter}
          onValueChange={(value: CompanyTypeFilter) =>
            handleFilterChange("companyTypeFilter", value)
          }
        >
          <SelectTrigger className="flex-1 w-full col-span-2 md:col-span-1 data-[size=default]:h-8 md:data-[size=default]:h-9">
            <SelectValue placeholder="Filter by company type" />
          </SelectTrigger>
          <SelectContent>
            {COMPANY_TYPE_FILTER.map((companyType) => (
              <SelectItem
                key={`Company__Type__${companyType}`}
                value={companyType}
              >
                {companyType === "all" ? "All company types" : companyType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.companySizeFilter}
          onValueChange={(value: CompanySizeFilter) =>
            handleFilterChange("companySizeFilter", value)
          }
        >
          <SelectTrigger className="flex-1 w-full col-span-2 md:col-span-1 data-[size=default]:h-8 md:data-[size=default]:h-9">
            <SelectValue placeholder="Filter by company size" />
          </SelectTrigger>
          <SelectContent>
            {COMPANY_SIZE_FILTER.map((companySize) => (
              <SelectItem
                key={`Company__Size__${companySize}`}
                value={companySize}
              >
                {companySize === "all" ? "All company sizes" : companySize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sorting.sortBy}
          onValueChange={(value: SortBy) =>
            handleSortChange(value, sorting.sortOrder)
          }
        >
          <SelectTrigger className="flex-1 w-full data-[size=default]:h-8 md:data-[size=default]:h-9">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_BY.map((sortBy) => (
              <SelectItem key={`Sort__By__${sortBy}`} value={sortBy}>
                {`Sort by ${sortBy
                  .split(/(?<![A-Z])(?=[A-Z])/)
                  .join(" ")
                  .toLowerCase()}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sorting.sortOrder}
          onValueChange={(value: SortOrder) =>
            handleSortChange(sorting.sortBy, value)
          }
        >
          <SelectTrigger className="flex-1 w-full data-[size=default]:h-8 md:data-[size=default]:h-9">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            {SORT_ORDER.map((sortOrder) => (
              <SelectItem key={`Sort__Order__${sortOrder}`} value={sortOrder}>
                {sortOrder === "asc" ? "Sort ascending" : "Sort descending"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
