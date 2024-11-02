import { github, TGithubUser, TGithubUserEmails } from '@/features/authentication/oauth/provider'
import { createUserDb, getUserByOauthIdDb } from '@/db/utils/users'
import { generateId } from '@/lib/helpers/generate'
import { getCookie } from '@/lib/helpers/headers'
import { createSession } from '@/lib/session/create'
import { OAuth2Tokens } from 'arctic'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { nextUrl } = req

  const code = nextUrl.searchParams.get('code')
  const state = nextUrl.searchParams.get('state')
  const storedState = await getCookie('github_oauth_state')
  if (!code || !state || !storedState || state !== storedState) return new Response(null, { status: 400 })

  let tokens: OAuth2Tokens
  try {
    tokens = await github.validateAuthorizationCode(code)
  } catch {
    return new Response(null, { status: 400 })
  }
  const githubUserResponse = await fetch('https://api.github.com/user', { headers: { Authorization: `Bearer ${tokens.accessToken()}` } })
  const { id: oauthId, login: name, avatar_url: avatarUrl }: TGithubUser = await githubUserResponse.json()

  const existingUser = await getUserByOauthIdDb(oauthId)
  if (existingUser) {
    await createSession(existingUser.id)
    redirect('/')
  }

  const githubEmailsReponse = await fetch('https://api.github.com/user/emails', { headers: { Authorization: `Bearer ${tokens.accessToken()}` } })
  const githubEmails: TGithubUserEmails = await githubEmailsReponse.json()
  const { email } = githubEmails.find(email => email.primary) || githubEmails[0]

  const userId = generateId()
  await createUserDb({ id: userId, oauthId, email, name, avatarUrl, provider: 'github' })
  await createSession(userId)

  redirect('/')
}
