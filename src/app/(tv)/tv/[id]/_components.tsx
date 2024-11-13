'use client'

import MediaSection from '@/features/media/components/section'
import MediaSectionSideNav from '@/features/media/components/section-sidenav'
import { create } from 'zustand'

const tvSectionStore = create<{ activeSection: Sections | null }>(() => ({ activeSection: null }))

export const TvSectionsSideNav = () => {
  const sections: Sections[] = ['Details', 'Credits', 'Seasons', 'Reviews & Keywords', 'Media', 'Similar', 'Recommendations']
  const { activeSection } = tvSectionStore()
  const activeIndex = activeSection ? sections.indexOf(activeSection) : 0

  return <MediaSectionSideNav sections={sections} activeIndex={activeIndex} />
}

export const TvSection = ({ section, ...props }: SectionProps) => {
  const handleInView = () => tvSectionStore.setState({ activeSection: section })
  return <MediaSection section={section} handleInView={handleInView} {...props} />
}

type Sections = 'Details' | 'Credits' | 'Seasons' | 'Reviews & Keywords' | 'Media' | 'Similar' | 'Recommendations'
type SectionProps = { section: Sections; className?: string; children: React.ReactNode }
