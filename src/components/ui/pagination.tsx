import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ITEMS_PER_PAGE } from "@/constants/items-per-page.const";
import { cn } from "@/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("flex w-full justify-between", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationButtonProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"button">;

function PaginationButton({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationButtonProps) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(buttonVariants({ size, variant: "outline" }), className)}
      {...props}
    />
  );
}

function PaginationFirst({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton
      aria-label="Go to first page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronsLeftIcon />
      <span className="sr-only">First</span>
    </PaginationButton>
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="sr-only">Previous</span>
    </PaginationButton>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="sr-only">Next</span>
      <ChevronRightIcon />
    </PaginationButton>
  );
}

function PaginationLast({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton
      aria-label="Go to last page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <ChevronsRightIcon />
      <span className="sr-only">Last</span>
    </PaginationButton>
  );
}

interface PageIndicatorProps extends React.ComponentProps<"div"> {
  currentPage: number;
  totalPages: number;
}

function PageIndicator({
  className,
  currentPage,
  totalPages,
  ...props
}: PageIndicatorProps) {
  return (
    <div {...props} className={cn("flex items-center gap-1", className)}>
      <span className="whitespace-nowrap">Page {currentPage}</span>
      <span className="whitespace-nowrap hidden sm:block">of {totalPages}</span>
    </div>
  );
}

interface PaginationItemsPerPageProps extends React.ComponentProps<"div"> {
  itemsPerPage: number;
  onItemsPerPageChange: (value: string) => void;
  totalItems: number;
  disabled?: boolean;
}

function PaginationItemsPerPage({
  className,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
  disabled,
  ...props
}: PaginationItemsPerPageProps) {
  return (
    <div {...props} className={cn("flex items-center gap-2", className)}>
      <span className="hidden md:block">Showing</span>

      <Select
        value={itemsPerPage.toString()}
        onValueChange={onItemsPerPageChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={itemsPerPage.toString()} />
        </SelectTrigger>
        <SelectContent>
          {ITEMS_PER_PAGE.map((itemsPerPage) => (
            <SelectItem key={itemsPerPage} value={itemsPerPage.toString()}>
              {itemsPerPage}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className="hidden sm:block">of {totalItems}</span>
    </div>
  );
}

export {
  PageIndicator,
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationItemsPerPage,
  PaginationLast,
  PaginationButton as PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
