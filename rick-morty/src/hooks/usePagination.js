import { useMemo } from "react";
export const DOTS = "...";

function usePagination({ currentPage, totalCount, pageSize }) {
  // This hook will return the range of numbers to be dispalyed in our pagination component as an array.
  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 1;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // No left dots to show, but right dots to be shown.
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    // No right dots to show, but left dots to be shown.
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 2;
      const rightRange = range(totalPageCount - rightItemCount, totalPageCount);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    //Both left and right dot to be shown.
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [currentPage, totalCount, pageSize]);

  return paginationRange;
}

export default usePagination;
