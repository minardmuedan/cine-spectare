import PageHeader from '@/components/pages/header'

export default function WatchedHistoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader title="Your Watched History" description="A history of movies and shows you’ve completed watching." />
      {children}
    </>
  )
}
