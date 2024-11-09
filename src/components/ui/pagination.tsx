import { ChevronLeft, ChevronRight, EllipsisIcon } from 'lucide-react'
import Link from 'next/link'
import { ButtonProps, buttonVariants } from './button'
import { cn } from '@/lib/utils'

const PaginationLink = (props: ButtonProps & { href: string; isActive?: boolean }) => {
  return (
    <li className={props.className}>
      <Link href={props.href} className={buttonVariants({ variant: props.isActive ? 'outline' : 'ghost', size: props.size || 'icon' })}>
        {props.children}
      </Link>
    </li>
  )
}

const PaginationPrevious = () => (
  <PaginationLink size="default" href="#">
    <ChevronLeft className="size-4" /> <span>Previous</span>
  </PaginationLink>
)

const PaginationNext = () => (
  <PaginationLink size="default" href="#">
    <span>Next</span> <ChevronRight className="size-4" />
  </PaginationLink>
)

const PaginationMore = ({ className }: { className: string }) => {
  return (
    <li className={cn('grid size-10 place-items-center', className)}>
      <EllipsisIcon className="size-4" />
      <span className="sr-only">more page</span>
    </li>
  )
}

// this pagination is responsive, ssr and does not require client's window width
export default function Pagination({ currentPage, maxPage }: { currentPage: number; maxPage: number }) {
  let page = currentPage > 1 ? currentPage - 1 : currentPage

  return (
    <ul className="flex items-center gap-1">
      {currentPage > 1 ? (
        <PaginationPrevious />
      ) : (
        [...Array(2)].map(() => (
          <PaginationLink key={page} href="#" isActive={page === currentPage}>
            {page++}
          </PaginationLink>
        ))
      )}

      {[...Array(4)].map(
        () =>
          page <= maxPage && (
            <PaginationLink key={page} href="#" isActive={page === currentPage}>
              {page++}
            </PaginationLink>
          ),
      )}

      {/* for md show 2 more item */}
      {[...Array(2)].map(() => (
        <PaginationLink key={page} href="#" isActive={page === currentPage} className={` ${page > maxPage ? 'hidden' : 'hidden md:block'}`}>
          {page++}
        </PaginationLink>
      ))}

      {page <= maxPage && <PaginationMore className="hidden md:grid" />}
      {page - 2 <= maxPage && <PaginationMore className="md:hidden" />}

      {currentPage < maxPage && <PaginationNext />}
    </ul>
  )
}
