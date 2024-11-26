import Back from '@/components/back-button'
import UnauthorizedUi from '@/components/pages/unauthorized'
import TmdbImage from '@/components/tmdb-image'
import { getUserViewHistoryDb } from '@/db/utils/media/view-history'
import { DeleteAllViewHistoryButton, DeleteViewHistoryButton } from '@/features/view-history/delete-history'
import { validateSession } from '@/lib/session/validate'

export default async function UserHistoryPage() {
  const { session } = await validateSession()
  if (!session) return <UnauthorizedUi className="min-h-full" />

  const viewHistory = await getUserViewHistoryDb(session.userId)

  return (
    <div className="flex-1">
      <Back className="mb-3 md:hidden" />
      <h2 className="text-muted-foreground">Your History</h2>

      {viewHistory?.length ? (
        <>
          <div className="flex justify-end">
            <DeleteAllViewHistoryButton />
          </div>
          <ul className="flex flex-col gap-2">
            {viewHistory.toReversed().map(({ id, media }) => (
              <li key={id} className="flex h-20 items-center gap-3 rounded border bg-accent-muted p-1">
                <div className="relative aspect-[1/1.5] h-full overflow-hidden rounded">
                  <TmdbImage src={media.posterPath} alt={`${media.title} poster`} fill sizes="47px" className="object-cover" />
                </div>

                <p className="flex-1">{media.title}</p>

                <DeleteViewHistoryButton viewHistoryId={id} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-5 text-sm text-muted-foreground">no history found</p>
      )}
    </div>
  )
}
