import TmdbImage from '@/components/tmdb-image'
import ErrorResult from '@/components/ui/error-result'
import ViewMoreContent from '@/components/view-more'
import { TPersonSocialMedia } from '@/lib/tmdb/_type/person'
import { getPerson, getPersonSocialMedia } from '@/lib/tmdb/person'
import Image from 'next/image'
import Link from 'next/link'

export default async function PersonDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [details, social] = await Promise.all([getPerson(id), getPersonSocialMedia(id)])

  const [detailsError, person] = details
  const [socialMediaError, socialMedia] = social

  if (detailsError) return <ErrorResult error={detailsError} className="h-96" />
  return (
    <>
      <div className="relative mx-auto aspect-[1/1.5] w-full max-w-72 overflow-hidden rounded-md md:mx-0">
        <TmdbImage src={person.profile_path} alt={`${person.name} profile`} fill sizes="284px" className="object-cover" />
      </div>

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

        {person.deathday && (
          <p className="text-sm">
            <span className="text-muted-foreground">Deathday: </span>
            {new Date(person.deathday).toDateString()}
          </p>
        )}

        <p className="text-sm">
          <span className="text-muted-foreground">Place of Birth: </span>
          {person.place_of_birth}
        </p>

        <p className="text-sm">
          <span className="text-muted-foreground">Also known as: </span>
          {person.also_known_as.join(', ')}
        </p>

        {!socialMediaError && <PersonSocialMedia socialMedia={socialMedia} />}
      </div>
    </>
  )
}

function PersonSocialMedia({ socialMedia }: { socialMedia: TPersonSocialMedia }) {
  const socialMediaIcons = [
    { key: 'facebook_id', src: 'https:www.facebook.com/', icon: '/facebook.svg' },
    { key: 'instagram_id', src: 'https://instagram.com/', icon: '/instagram.svg' },
    { key: 'tiktok_id', src: 'https://tiktok.com/@', icon: '/tiktok.svg' },
    { key: 'twitter_id', src: 'https://twitter.com/', icon: '/twitter.svg' },
    { key: 'youtube_id', src: 'https://www.youtube.com/', icon: '/youtube.svg' },
  ] as const

  return (
    <ul className="flex items-center justify-evenly gap-5 pt-10 md:justify-start md:pt-0">
      {socialMediaIcons
        .filter(({ key }) => socialMedia[key])
        .map(({ icon, key, src }, i) => (
          <li key={i}>
            <Link href={`${src}${socialMedia[key]}/`}>
              <Image src={icon} alt={`${key} icon`} height={24} width={24} />
              <span className="sr-only">{key}</span>
            </Link>
          </li>
        ))}
    </ul>
  )
}
