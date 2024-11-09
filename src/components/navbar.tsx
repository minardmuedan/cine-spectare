'use client'

import Link from 'next/link'
import Devtools from './__devtiools'
import UserSideNav from './user/side-navigation'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export default function Navbar() {
  const movieLinks = [
    { title: 'Popular', href: '/movies', description: 'Discover the latest trending films loved by audiences worldwide' },
    { title: 'Now Playing', href: '/movies/now-playing', description: 'Check out the hottest movies currently in theaters' },
    { title: 'Top Rated', href: '/movies/top-rated', description: 'Explore critically acclaimed films with the highest ratings' },
    { title: 'Upcoming', href: '/movies/upcoming', description: 'Get a sneak peek of exciting films set to release soon' },
  ]

  const tvLinks = [
    { title: 'Popular', href: '/tv', description: 'Discover the most-watched and trending TV shows' },
    { title: 'Airing Today', href: '/tv/airing-today', description: 'Catch up on TV shows that are broadcasting new episodes today' },
    { title: 'On TV', href: '/tv/on-the-air', description: "See what's currently playing across various TV networks" },
    { title: 'Top Rated ', href: '/tv/top-rated', description: 'Explore highly acclaimed TV shows with the best reviews' },
  ]

  const medias = [
    { title: 'Movies', links: movieLinks },
    { title: 'Tv Shows', links: tvLinks },
  ]

  return (
    <header className="sticky top-0 z-50 h-14 w-full border-b bg-background/60 px-20 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between">
        <Link href="/">Home</Link>

        <NavigationMenu className="hidden sm:flex">
          <NavigationMenuList className="gap-5">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle({ className: 'bg-black/0' })}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {medias.map((media, i) => (
              <NavigationMenuItem key={i}>
                <NavigationMenuTrigger className="bg-background/0">{media.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-56 grid-cols-1 p-2 md:w-[30rem] md:grid-cols-2">
                    {media.links.map((link, i2) => (
                      <li key={i2} className="overflow-hidden rounded-md">
                        <NavigationMenuLink asChild>
                          <Link href={link.href}>
                            <div className="h-full p-4 transition-colors hover:bg-accent">
                              <p className="mb-1 text-primary">{link.title}</p>
                              <p className="text-sm text-muted-foreground">{link.description}</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-10">
          <UserSideNav />

          <Devtools />
        </div>
      </div>
    </header>
  )
}
