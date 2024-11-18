import Back from '@/components/back-button'

export default function PersonLayout({ children, credits }: { children: React.ReactNode; credits: React.ReactNode }) {
  return (
    <div className="relative p-2 md:px-5 lg:px-10">
      <Back className="mb-10" />
      <section className="flex flex-col gap-10 md:flex-row md:gap-5">{children}</section>

      <section className="flex gap-5 pt-20">{credits}</section>
    </div>
  )
}
