'use client'

import MediaSection from '@/features/media/components/section'
import MediaSectionSideNav from '@/features/media/components/section-sidenav'
import { create } from 'zustand'

const movieSectionStore = create<{ activeSection: Sections | null }>(() => ({ activeSection: null }))

export const MovieSectionsSideNav = () => {
  const sections: Sections[] = ['Details', 'Credits', 'Reviews & Keywords', 'Media', 'Similar', 'Recommendations']

  const { activeSection } = movieSectionStore()
  const activeIndex = activeSection ? sections.indexOf(activeSection) : -1

  return <MediaSectionSideNav sections={sections} activeIndex={activeIndex} />
}

export const MovieSection = ({ section, ...props }: SectionProps) => {
  const handleInView = () => movieSectionStore.setState({ activeSection: section })
  return <MediaSection section={section} handleInView={handleInView} {...props} />
}

type Sections = 'Details' | 'Credits' | 'Reviews & Keywords' | 'Media' | 'Similar' | 'Recommendations'
type SectionProps = { section: Sections; className?: string; children: React.ReactNode }
