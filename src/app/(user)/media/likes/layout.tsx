import PageHeader from '@/components/pages/header'

export default function LikesMediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader title="Your Likes" description="Movies and shows you've liked. Revisit your favorites anytime" />
      {children}
    </>
  )
}
