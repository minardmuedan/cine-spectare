import Section from '@/components/pages/section'
import { SearchQueryHeader, SearchQueryNavbar, SearchQueryWrapper } from './_components'
import Back from '@/components/back-button'
import { Suspense } from 'react'

export default async function SearchQueryLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section className="mb-10">
      <Back />
      <Suspense>
        <SearchQueryWrapper>
          <SearchQueryHeader />
          <div className="flex flex-col gap-5 md:flex-row">
            <SearchQueryNavbar />

            <div className="flex-1">{children}</div>
          </div>
        </SearchQueryWrapper>
      </Suspense>
    </Section>
  )
}
