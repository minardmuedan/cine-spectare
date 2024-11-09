import Back from '@/components/back-button'
import UnauthorizedUi from '@/components/pages/unauthorized'
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
              <li key={id} className="flex h-20 items-center gap-2 rounded border bg-accent-muted p-1">
                <img src={`https://image.tmdb.org/t/p/w500${media.posterPath}`} className="aspect-square h-full rounded object-cover" />
                <p className="flex-1">{media.title}</p>

                <DeleteViewHistoryButton viewHistoryId={id} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>no history</p>
      )}
    </div>
  )
}
