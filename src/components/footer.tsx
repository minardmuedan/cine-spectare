import Link from 'next/link'
import SearchBar from './search-bar'
import Image from 'next/image'
import { Button } from './ui/button'

export default function Footer() {
  const navlinks = [
    {
      title: 'Movies',
      links: [
        { title: 'Popular', href: '/movies' },
        { title: 'Now Playing', href: '/movies/now-playing' },
        { title: 'Top Rated', href: '/movies/top-rated' },
        { title: 'Upcoming', href: '/movies/upcoming' },
      ],
    },
    {
      title: 'Tv Shows',
      links: [
        { title: 'Airing Today', href: '/tv-shows/airing-today' },
        { title: 'On the Air', href: '/tv-shows/on-the-air' },
        { title: 'Popular', href: '/tv-shows' },
        { title: 'Top Rated', href: '/tv-shows/top-rated' },
      ],
    },
  ]

  const socialLinks = [
    {
      title: 'github',
      logoSrc: '/github.svg',
      href: 'https://github.com/minardmuedan',
    },
    {
      title: 'instagram',
      logoSrc: '/instagram.svg',
      href: 'https://www.instagram.com/parilla_minard/',
    },
    {
      title: 'facebook',
      logoSrc: '/facebook.svg',
      href: 'https://www.facebook.com/minard.parilla',
    },
  ]

  return (
    <footer>
      <div className="mx-auto mb-7 w-10/12 max-w-sm border-t">
        <span className="sr-only">footer line</span>
      </div>

      <div className="mb-7 flex flex-col items-center gap-2 px-2 md:px-4">
        <p className="font-medium text-muted-foreground">{'Didn’t find what you’re looking for?'}</p>
        <SearchBar className="w-full max-w-4xl" placeholder="Try to search it ..." />
      </div>

      <div className="relative px-2 pb-5 pt-7 md:px-4">
        <Image src="/hero-bg.png" alt="hero background" priority fill className="-z-10 object-cover opacity-5" />

        <ul className="mb-7 flex flex-col justify-between gap-10 border-b pb-7 md:flex-row">
          <li>
            <p className="mb-2 text-xl font-medium text-primary">CineSpectare</p>
            <p className="max-w-[700px] text-sm text-muted-foreground">
              Discover endless entertainment with our curated collection of movies and TV shows. Explore a world of captivating stories and
              unforgettable moments. Your next favorite film or series awaits!
            </p>
          </li>

          <li className="flex justify-center gap-10 whitespace-nowrap text-center md:text-start">
            {navlinks.map(({ title, links }, i) => (
              <div key={i}>
                <p className="mb-2">{title}</p>
                <nav>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {links.map((link, i2) => (
                      <li key={i2}>
                        <Link href={link.href} className="transition-colors hover:text-primary">
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </li>

          <div className="flex flex-col items-center gap-5">
            <p className="text-center text-xs text-muted-foreground">the provider of movies and tv shows</p>
            <Link href="https://www.themoviedb.org/">
              <Image src="/tmdb-logo.svg" alt="tmdb logo" width={80} height={80} /> <span className="sr-only">go to tmdb website</span>
            </Link>
          </div>
        </ul>

        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <p className="text-xs text-muted-foreground">© 2024 · Minard Parilla | All rights reserved</p>

          <ul className="flex items-center gap-5">
            {socialLinks.map(({ title, href, logoSrc }, i) => (
              <li key={i}>
                <Link href={href} target="_blank">
                  <>
                    <Image src={logoSrc} alt={`${title} logo`} width={16} height={16} className={`${i == 0 && 'invert'}`} />
                    <span className="sr-only">{title}</span>
                  </>
                </Link>
              </li>
            ))}
            <li>
              <Button variant="outline" asChild>
                <a href="https://minardparilla.vercel.app">{'minard’s portfolio'}</a>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
