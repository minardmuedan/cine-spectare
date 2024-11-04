export default function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="flex flex-col gap-1 pb-12 pt-10 text-center md:text-start">
      <h1 className="text-3xl font-medium md:text-4xl">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </header>
  )
}
