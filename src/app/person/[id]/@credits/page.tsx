import { TPersonCombinedCredit } from '@/lib/tmdb/_type/person'
import { getPersonCombinedCredits } from '@/lib/tmdb/person'
import PersonCredits from './_component'

export default async function PesonCombinedCreditsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [error, credits] = await getPersonCombinedCredits(id)

  if (error) return <p>{error.message}</p>

  const departments = credits.crew.reduce<Record<string, (TPersonCombinedCredit & { role: string })[]>>((acc, { department, job, ...media }) => {
    if (!acc[department]) acc[department] = [{ ...media, role: job }]
    else {
      const existingIndex = acc[department].findIndex(accMedia => accMedia.id === media.id)

      if (existingIndex !== -1) acc[department][existingIndex].role = `${acc[department][existingIndex].role}, ${job}`
      else acc[department].push({ ...media, role: job })
    }
    return acc
  }, {})

  const actingMedia = credits.cast.map(({ character, ...media }) => ({ role: character, ...media }))

  const personCredits = [
    { department: 'Acting', media: actingMedia },
    ...Object.entries(departments).map(([key, value]) => ({ department: key, media: value })),
  ]

  return <PersonCredits credits={personCredits} />
}
