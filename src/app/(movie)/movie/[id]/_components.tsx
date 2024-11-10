'use client'

import { Button } from '@/components/ui/button'
import { create } from 'zustand'
import { InView } from 'react-intersection-observer'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const movieDetailsSectionStore = create<{ activeSection: Sections | null }>(() => ({ activeSection: null }))

export const MovieDetailsSectionsSideNav = () => {
  const { activeSection } = movieDetailsSectionStore()
  const navs: Sections[] = ['Details', 'Credits', 'Reviews & Keywords', 'Media', 'Similarities', 'Recommendations']

  const activeIndex = activeSection ? navs.indexOf(activeSection) : -1

  return (
    <div className="sticky top-0 hidden h-fit pt-20 md:block">
      <h2 className="text-xl font-medium text-muted-foreground">On this Page</h2>
      <nav className="relative mt-2 flex flex-col *:justify-start *:rounded-none">
        <div
          style={{ visibility: activeIndex == -1 ? 'hidden' : 'visible', transform: `translateY(${activeIndex * 2.5}rem)` }}
          className="absolute left-0 -z-10 h-10 w-full bg-accent transition-transform ease-in"
        >
          <span className="sr-only">navigation backdrop</span>
        </div>

        {navs.map((title, i) => (
          <Button key={i} variant="ghost" className={`${activeIndex !== i && 'text-muted-foreground'}`} asChild>
            <Link href={`#${title.split(' & ').join('-').toLowerCase()}`}>{title}</Link>
          </Button>
        ))}
      </nav>
    </div>
  )
}

export const MovieSection = ({ section, className, ...props }: SectionProps) => {
  return (
    <InView
      id={section.split(' & ').join('-').toLowerCase()}
      as="section"
      threshold={0.01}
      rootMargin="-25% 0px -65% 0px"
      onChange={inView => inView && movieDetailsSectionStore.setState({ activeSection: section })}
      className={cn('pt-20', className)}
      {...props}
    />
  )
}

type Sections = 'Details' | 'Credits' | 'Reviews & Keywords' | 'Media' | 'Similarities' | 'Recommendations'
type SectionProps = { section: Sections; className?: string; children: React.ReactNode }
