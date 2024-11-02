import { google, TGoogleUser } from '@/features/authentication/oauth/provider'
import { createUserDb, getUserByOauthIdDb } from '@/db/utils/users'
import { generateId } from '@/lib/helpers/generate'
import { getCookie } from '@/lib/helpers/headers'
import { createSession } from '@/lib/session/create'
import { decodeIdToken, OAuth2Tokens } from 'arctic'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { nextUrl } = req

  const code = nextUrl.searchParams.get('code')
  const state = nextUrl.searchParams.get('state')
  const storedState = await getCookie('google_oauth_state')
  const codeVerifier = await getCookie('google_code_verifier')
  if (!code || !state || !storedState || !codeVerifier || state !== storedState) return new Response(null, { status: 400 })

  let tokens: OAuth2Tokens
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier)
  } catch {
    return new Response(null, { status: 400 })
  }

  const { sub: oauthId, email, name, picture: avatarUrl } = decodeIdToken(tokens.idToken()) as TGoogleUser

  const existingUser = await getUserByOauthIdDb(oauthId)
  if (existingUser) {
    await createSession(existingUser.id)
    return redirect('/')
  }

  const userId = generateId()
  await createUserDb({ id: userId, oauthId, email, name, avatarUrl, provider: 'google' })
  await createSession(userId)
  return redirect('/')
}
