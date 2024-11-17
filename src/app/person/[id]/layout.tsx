export default function PersonLayout({ children, credits }: { children: React.ReactNode; credits: React.ReactNode }) {
  return (
    <div className="relative p-2 pt-10 md:px-5 lg:px-10">
      <section className="flex flex-col gap-10 border md:flex-row md:gap-5">{children}</section>

      <section className="flex gap-5 border pt-20">{credits}</section>
    </div>
  )
}
