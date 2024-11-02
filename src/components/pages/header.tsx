export default function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="mb-8 flex flex-col gap-1 text-center md:text-start">
      <h1 className="text-2xl font-medium text-primary md:text-4xl">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </header>
  )
}
