'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { clientFetcher } from '@/lib/helpers/client-fetcher'
import { TReviews } from '@/lib/tmdb/_movie-type'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ChevronRightIcon, Loader2Icon, TriangleAlertIcon } from 'lucide-react'
import { useState } from 'react'
import { InView } from 'react-intersection-observer'

export default function MediaReviewsDialog({ initialReviews, type }: { initialReviews: TReviews; type: 'movie' | 'tv' }) {
  const {
    data: reviews,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['reviews', `${type}-${initialReviews.id}`],
    queryFn: ({ pageParam }) => clientFetcher<TReviews>(`/${type}/${initialReviews.id}/reviews?page=${pageParam}`),
    initialData: { pageParams: [1], pages: [initialReviews] },
    initialPageParam: 1,
    getNextPageParam: (_lP, _aP, lastPageParams) => (lastPageParams < initialReviews.total_pages ? lastPageParams + 1 : null),
    select: data => data.pages.map(reviews => reviews?.results.map(review => review)),
  })
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: 'link', className: 'pr-0' })}>
        See More <ChevronRightIcon />
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader title={`${type} Reviews`} description="See what others are saying" className="*:first-letter:uppercase" />

        <ul className="flex flex-col gap-4">
          {reviews.flat().map(
            review =>
              review && (
                <li key={review.id} className="flex gap-2">
                  <Avatar>
                    <AvatarImage src={review.author_details.avatar_path} />
                    <AvatarFallback>{review.author_details.name?.slice(0, 2)}</AvatarFallback>
                  </Avatar>

                  <div className="rounded-md border bg-accent-muted p-2 text-sm transition-all">
                    <p className="mb-2 font-medium">
                      {review.author_details.name}
                      <span className="text-xs text-muted-foreground"> {new Date(review.updated_at).toLocaleString()}</span>
                    </p>

                    <Comment text={review.content} />
                  </div>
                </li>
              ),
          )}

          {error ? (
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2 pt-4 text-sm text-destructive">
                <TriangleAlertIcon className="size-4" /> <p>{error.message}</p>
              </div>

              <Button disabled={isFetchingNextPage} className="w-fit" onClick={() => fetchNextPage()}>
                retry{isFetchingNextPage && 'ing...'}
              </Button>
            </div>
          ) : hasNextPage ? (
            <InView rootMargin="400px 0px" onChange={inView => inView && !isFetchingNextPage && fetchNextPage()} className="flex justify-center pt-4">
              <Loader2Icon size={16} className="animate-spin" />
            </InView>
          ) : (
            <p className="text-center text-sm text-muted-foreground">All caught up!</p>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export function Comment({ text }: { text: string }) {
  const maxLength = 300

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="*:inline">
      <p className="text-sm" dangerouslySetInnerHTML={{ __html: text.slice(0, !isExpanded ? maxLength : undefined) }} />
      {text.length > maxLength && (
        <>
          <span>... </span>
          <Button
            variant="link"
            className="size-fit p-0 opacity-75 hover:no-underline hover:opacity-100"
            onClick={() => setIsExpanded(prev => !prev)}
          >
            {isExpanded ? 'See Less' : 'See More'}
          </Button>
        </>
      )}
    </div>
  )
}
