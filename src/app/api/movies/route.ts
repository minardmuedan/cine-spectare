export async function GET() {
  const res = await fetch('https://api.themoviedb.org/3/movie/now_playing', {
    cache: 'force-cache',
    headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
  })
  const data = await res.json()
  return Response.json(data)
}
