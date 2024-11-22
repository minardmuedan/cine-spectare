import { ChevronLeft, ChevronRight, EllipsisIcon } from 'lucide-react'
import Link from 'next/link'
import { ButtonProps, buttonVariants } from './button'
import { cn } from '@/lib/utils'

type Href = string

const PaginationLink = (props: ButtonProps & { href: Href; isActive?: boolean }) => {
  return (
    <li className={props.className}>
      <Link href={props.href} className={buttonVariants({ variant: props.isActive ? 'default' : 'ghost', size: props.size || 'icon' })}>
        {props.children}
      </Link>
    </li>
  )
}

const PaginationPrevious = ({ href }: { href: Href }) => (
  <PaginationLink size="default" href={href}>
    <ChevronLeft className="size-4" /> <span>Previous</span>
  </PaginationLink>
)

const PaginationNext = ({ href }: { href: Href }) => (
  <PaginationLink size="default" href={href}>
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

export default function Pagination({ currentPage, maxPage, url }: { currentPage: number; maxPage: number; url?: string }) {
  let page = currentPage > 1 ? currentPage - 1 : currentPage
  const symbol = url ? `${url}&` : '?'

  return (
    <ul className="my-10 flex items-center justify-center gap-1">
      {currentPage > 1 ? (
        <PaginationPrevious href={`${symbol}page=${currentPage - 1}`} />
      ) : page < maxPage ? (
        [...Array(2)].map(() => (
          <PaginationLink key={page} href={`${symbol}page=${page}`} isActive={page === currentPage}>
            {page++}
          </PaginationLink>
        ))
      ) : null}

      {[...Array(4)].map(
        () =>
          page <= maxPage && (
            <PaginationLink key={page} href={`${symbol}page=${page}`} isActive={page === currentPage}>
              {page++}
            </PaginationLink>
          ),
      )}

      {/* for md show 2 more item */}
      {[...Array(2)].map(() => (
        <PaginationLink
          key={page}
          href={`${symbol}page=${page}`}
          isActive={page === currentPage}
          className={` ${page > maxPage ? 'hidden' : 'hidden md:block'}`}
        >
          {page++}
        </PaginationLink>
      ))}

      {page <= maxPage && <PaginationMore className="hidden md:grid" />}
      {page - 2 <= maxPage && <PaginationMore className="md:hidden" />}

      {currentPage < maxPage && <PaginationNext href={`${symbol}page=${currentPage + 1}`} />}
    </ul>
  )
}
