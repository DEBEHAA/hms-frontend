import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function DashTablePagination({ table }) {
  const [currentPage, setCurrentPage] = useState(
    table.getState().pagination.pageIndex + 1,
  );

  useEffect(() => {
    setCurrentPage(table.getState().pagination.pageIndex + 1);
  }, [table.getState().pagination.pageIndex]);

  return (
    <div className="px-1 py-2.5">
      <Pagination>
        <PaginationContent className="flex w-full items-center justify-between">
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              className={cn(
                "cursor-pointer",
                !table.getCanPreviousPage() && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
          <div className="flex items-center gap-2">
            Page{" "}
            <Input
              value={currentPage}
              onChange={(e) => {
                setCurrentPage(e.target.value);
                table.setPageIndex(e.target.value - 1);
              }}
              className="h-[35px] w-10 text-center text-[18px] font-medium"
            />{" "}
            / <span className="text-[18px]">{table.getPageCount()}</span>
          </div>
          <PaginationItem>
            <PaginationNext
              aria-disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              className={cn(
                "cursor-pointer",
                !table.getCanNextPage() && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
