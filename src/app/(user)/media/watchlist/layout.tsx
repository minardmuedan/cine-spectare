import PageHeader from '@/components/pages/header'

export default function WatchListLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader title="Your Watchlist" description="Your list of must-watch movies and shows, ready when you are" />
      {children}
    </>
  )
}
