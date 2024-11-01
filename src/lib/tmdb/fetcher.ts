export const TMDBFetcher = async <T>(url: string) => {
  const res = await fetch(url, {
    cache: 'force-cache',
    headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
  })

  if (!res.ok) {
    const error: { status_message: string } = await res.json()
    throw new Error(error.status_message)
  }

  const data: T = await res.json()
  return data
}
