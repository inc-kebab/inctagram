import { useMemo } from 'react'

interface PaginationParams {
  currentPage: number
  pageSize: number
  siblingCount: number
  totalCount: number
}

const range = (start: number, end: number) => {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}

export const usePagination = ({
  currentPage,
  pageSize,
  siblingCount,
  totalCount,
}: PaginationParams) => {
  return useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)

    //siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, 0, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

      return [firstPageIndex, 0, ...rightRange]
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex)

    return [firstPageIndex, 0, ...middleRange, 0, lastPageIndex]
  }, [totalCount, pageSize, siblingCount, currentPage])
}
