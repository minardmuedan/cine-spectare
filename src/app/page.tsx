export default function Home() {
  return (
    <div className="flex w-full flex-col items-center gap-3 pt-20 text-center">
      <p className="text-sm text-muted-foreground">finding something to watch? this might be -</p>
      <h1 className="max-w-3xl font-bolota text-3xl md:text-5xl">YOUR ULTIMATE ENTERTAINMENT DESTINATION</h1>
      <p>{Date.now() - new Date('2024-10-13T16:49:45.014Z').getTime() > 30 * 1000 ? 'oo' : 'hinde'}</p>
      <p>{Date.now() - new Date('2024-10-13T16:49:45.014Z').getTime()}</p>
      <p>{JSON.stringify(new Date())}</p>
    </div>
  )
}
