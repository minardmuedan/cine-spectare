import Pagination from '@/components/ui/pagination'

export default function Home() {
  return (
    <div className="flex h-[50dvh] items-center justify-center">
      <Pagination currentPage={8} maxPage={8} />
    </div>
  )
}
