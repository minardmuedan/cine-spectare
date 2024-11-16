import TmdbImage from '@/components/tmdb-image'
import ViewMoreContent from '@/components/view-more'
import { getPerson } from '@/lib/tmdb/person'

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [error, person] = await getPerson(id)

  if (error) return <p>{error.message}</p>
  return (
    <section className="mx-auto flex w-fit flex-col gap-10 md:flex-row md:gap-5">
      <TmdbImage src={person.profile_path} alt={`${person.name} profile`} className="mx-auto h-fit w-full max-w-72 rounded-md md:mx-0" />

      <div className="max-w-[700px] flex-1 space-y-5">
        <div>
          <h1 className="text-2xl font-medium">{person.name}</h1>
          <ViewMoreContent text={person.biography} maxLength={500} />
        </div>

        <p className="text-sm">
          <span className="text-muted-foreground">Known For: </span>
          {person.known_for_department}
        </p>
        <p className="text-sm">
          <span className="text-muted-foreground">Birthday: </span> {new Date(person.birthday).toDateString()}{' '}
          <span className="text-sm text-muted-foreground">
            ({Math.floor((Date.now() - new Date(person.birthday).getTime()) / (1000 * 60 * 60 * 24 * 365.25))})
          </span>
        </p>

        <p className="text-sm">
          <span className="text-muted-foreground">Place of Birth: </span>
          {person.place_of_birth}
        </p>
      </div>
    </section>
  )
}
