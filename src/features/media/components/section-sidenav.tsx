import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function MediaSectionSideNav({ sections, activeIndex }: { sections: string[]; activeIndex: number }) {
  return (
    <div className="sticky top-[6.5rem] mt-20 hidden h-fit md:block">
      <h2 className="text-xl font-medium text-muted-foreground">On this Page</h2>
      <nav className="relative mt-2 flex flex-col *:justify-start *:rounded-none">
        <div
          style={{ visibility: activeIndex == -1 ? 'hidden' : 'visible', transform: `translateY(${activeIndex * 2.5}rem)` }}
          className="absolute left-0 -z-10 h-10 w-full bg-accent transition-transform ease-in"
        >
          <span className="sr-only">navigation backdrop</span>
        </div>

        {sections.map((title, i) => (
          <Button key={i} variant="ghost" className={`${activeIndex !== i && 'text-muted-foreground'}`} asChild>
            <Link href={`#${title.split(' & ').join('-').toLowerCase()}`}>{title}</Link>
          </Button>
        ))}
      </nav>
    </div>
  )
}
