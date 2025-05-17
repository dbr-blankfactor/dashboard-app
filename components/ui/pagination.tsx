"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/custom-select";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/ui/custom-icons";

interface PaginationProps {
  itemsPerPage: string;
  onItemsPerPageChange: (value: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevPage = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center mt-4">
      <div className="flex items-center">
        <Select value={itemsPerPage} onValueChange={onItemsPerPageChange}>
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="18">18</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <span className="ml-2 text-sm text-gray-500">per page</span>
      </div>

      <div className="flex items-center gap-2 justify-center w-5/6">
        <Button
          variant="ghost"
          size="icon"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          <ChevronLeftIcon className="h-3 w-3 text-teal-400" />
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="ghost"
          size="icon"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          <ChevronRightIcon className="h-3 w-3 text-teal-400" />
        </Button>
      </div>
    </div>
  );
}
