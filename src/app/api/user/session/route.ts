import { validateSession } from '@/lib/session/validate'

export async function GET() {
  const { user } = await validateSession()
  return Response.json(user)
}
