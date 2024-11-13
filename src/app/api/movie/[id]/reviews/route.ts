import { getMovieReviews } from '@/lib/tmdb/movies'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const page = req.nextUrl.searchParams.get('page') || '1'

  const [error, reviews] = await getMovieReviews(id, page)

  if (error) return Response.json(error.message, { status: 500 })

  return Response.json(reviews)
}