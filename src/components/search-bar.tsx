import Form from 'next/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SearchIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function SearchBar() {
  const pathname = usePathname()

  const path = pathname === '/search/tv' || pathname === '/search/people' || pathname === '/search/keywords' ? pathname : '/search/movie'

  return (
    <Form className="relative" action={path}>
      <Input name="query" placeholder="Search" className="w-64 border-border bg-accent-muted pr-12" />

      <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-1/2 -translate-y-1/2">
        <SearchIcon />
      </Button>
    </Form>
  )
}
