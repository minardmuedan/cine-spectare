'use client'

import Link from 'next/link'
import SearchBar from './search-bar'
import UserSideNav from './user/side-navigation'

import { AlignJustifyIcon, ChevronRight } from 'lucide-react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { buttonVariants } from './ui/button'

export default function Navbar() {
  const movieLinks = [
    { title: 'Popular', href: '/movies', description: 'Discover the latest trending films loved by audiences worldwide' },
    { title: 'Now Playing', href: '/movies/now-playing', description: 'Check out the hottest movies currently in theaters' },
    { title: 'Top Rated', href: '/movies/top-rated', description: 'Explore critically acclaimed films with the highest ratings' },
    { title: 'Upcoming', href: '/movies/upcoming', description: 'Get a sneak peek of exciting films set to release soon' },
  ]

  const tvLinks = [
    { title: 'Popular', href: '/tv-shows', description: 'Discover the most-watched and trending TV shows' },
    { title: 'Airing Today', href: '/tv-shows/airing-today', description: 'Catch up on TV shows that are broadcasting new episodes today' },
    { title: 'On TV', href: '/tv-shows/on-the-air', description: "See what's currently playing across various TV networks" },
    { title: 'Top Rated ', href: '/tv-shows/top-rated', description: 'Explore highly acclaimed TV shows with the best reviews' },
  ]

  const medias = [
    { title: 'Movies', links: movieLinks },
    { title: 'Tv Shows', links: tvLinks },
  ]

  return (
    <header className="sticky top-0 z-50 h-14 w-full border-b bg-background/60 px-4 backdrop-blur-sm sm:px-5 lg:px-10">
      <div className="flex h-full items-center justify-between gap-5">
        <Sheet>
          <SheetTrigger className="md:hidden">
            <AlignJustifyIcon /> <span className="sr-only">open navbar</span>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="hidden">
              <SheetTitle>Navbar</SheetTitle>
              <SheetDescription>A links where movies and tv shows will get you</SheetDescription>
            </SheetHeader>

            <nav className="space-y-8">
              {medias.map((media, i) => (
                <div key={i}>
                  <p className="mb-2 font-medium text-muted-foreground">{media.title}</p>
                  <ul className="*:j flex flex-col gap-2">
                    {media.links.map((media, i2) => (
                      <SheetClose key={i2} className={buttonVariants({ variant: 'outline', className: 'justify-between' })} asChild>
                        <Link href={media.href}>
                          {media.title} <ChevronRight size={14} className="text-muted-foreground" />
                        </Link>
                      </SheetClose>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="text-sm font-medium">
          CineSpectare
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-3">
            <NavigationMenuItem asChild>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle({ className: 'bg-black/0 md:hidden lg:block' })}>Home</NavigationMenuLink>
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
                              <p className="mb-1 font-medium text-primary">{link.title}</p>
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

        <SearchBar />

        <UserSideNav />
      </div>
    </header>
  )
}
