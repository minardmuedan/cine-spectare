export default function PersonLayout({ children, movie }: { children: React.ReactNode; movie: React.ReactNode }) {
  return (
    <div className="relative p-2 pt-10 md:px-5 lg:px-10">
      {children}

      <section className="pt-20">{movie}</section>
    </div>
  )
}
