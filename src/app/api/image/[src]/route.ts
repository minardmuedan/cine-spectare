import { NextRequest } from 'next/server'
import sharp from 'sharp'

export async function GET(req: NextRequest, { params }: { params: Promise<{ src: string }> }) {
  const { src } = await params
  if (!src) return Response.json('Undefined image source', { status: 500 })

  const { searchParams } = req.nextUrl

  const width = Number(searchParams.get('w')) || 500

  try {
    const imageResponse = await fetch(`https:/image.tmdb.org/t/p/original/${src}`)
    const imageBuffer = await imageResponse.arrayBuffer()

    const resizedImage = await sharp(imageBuffer).resize(width).toBuffer()
    return new Response(resizedImage, { status: 200, headers: { 'Content-Type': 'image/png' } })
  } catch {
    return Response.json('Failed to process image', { status: 500 })
  }
}
