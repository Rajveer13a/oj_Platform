import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { pagination } from "@/lib/types"
import { Dispatch, SetStateAction } from "react"

export default function ProblemPagination({
  paginationData,
  setPage,
}: {
  paginationData: pagination
  setPage: Dispatch<SetStateAction<number>>
}) {
  const { page: currentPage, totalPages, hasPrev, hasNext } = paginationData

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)

      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 3) {
        end = 4
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3
      }

      if (start > 2) {
        pages.push("ellipsis")
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (end < totalPages - 1) {
        pages.push("ellipsis")
      }

      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => hasPrev && setPage(currentPage - 1)}
            className={`${!hasPrev ? "pointer-events-none opacity-40" : "cursor-pointer"}`}
          />
        </PaginationItem>

        {pageNumbers.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          const isActive = currentPage === item

          return (
            <PaginationItem 
              onClick={() => !isActive && setPage(item)} 
              key={`page-${item}`}
            >
              <PaginationLink
                className={isActive ? "pointer-events-none" : "cursor-pointer"}
                isActive={isActive}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => hasNext && setPage(currentPage + 1)}
            className={`${!hasNext ? "pointer-events-none opacity-45" : "cursor-pointer"}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
