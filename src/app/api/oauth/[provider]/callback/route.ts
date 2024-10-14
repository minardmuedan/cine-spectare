import { createUserDb, getUserByOauthIdDb } from '@/lib/db/utils/user'
import { github, google, TGithubUser, TGithubUserEmails, TGoogleUser } from '@/lib/auth/oauth-provider'
import { getCookie } from '@/lib/auth/helpers/headers'
import { createSession } from '@/lib/auth/session/create-session'
import { generateId } from '@/lib/auth/helpers/generate'
import { redirect } from 'next/navigation'

// GOOGLE & GITHUB CALLBACK VALIDATIONS

export async function GET(req: Request, { params: { provider } }: { params: { provider: string } }) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = (provider === 'google' ? getCookie('google_oauth_state') : getCookie('github_oauth_state')) ?? null
  if (!code || !state || !storedState || state !== storedState) return redirect('/error')

  try {
    const id = generateId()

    // google
    if (provider === 'google') {
      const codeVerifier = getCookie('code_verifier') ?? null
      if (!codeVerifier) return redirect('/signin')

      const tokens = await google.validateAuthorizationCode(code, codeVerifier)
      const googleUser: TGoogleUser = await getOauthUser('https://openidconnect.googleapis.com/v1/userinfo', tokens)
      const { sub: oauthId, email, name, picture } = googleUser

      const existingUser = await getUserByOauthIdDb(oauthId)
      if (existingUser) return createSessionThenRedirect(existingUser.id)

      await createUserDb({ id, oauthId, name, email, avatarUrl: picture, provider: 'google' })
    }

    // github
    if (provider === 'github') {
      const tokens = await github.validateAuthorizationCode(code)
      const { id: oauthId, login: name, avatar_url }: TGithubUser = await getOauthUser('https://api.github.com/user', tokens)

      const existingUser = await getUserByOauthIdDb(oauthId)
      if (existingUser) return createSessionThenRedirect(existingUser.id)

      const githubUserEmail: TGithubUserEmails = await getOauthUser('https://api.github.com/user/emails', tokens)
      const { email } = githubUserEmail.find(email => email.primary) ?? githubUserEmail[0] ?? null

      await createUserDb({ id, oauthId, name, email, avatarUrl: avatar_url, provider: 'github' })
    }

    return createSessionThenRedirect(id)
  } catch {
    return redirect('/error')
  }
}

//
// helpers
async function createSessionThenRedirect(userId: string) {
  await createSession(userId)
  redirect('/')
}

async function getOauthUser(url: string, tokens: { accessToken: string }) {
  const response = await fetch(url, { headers: { Authorization: `Bearer ${tokens.accessToken}` } })
  return await response.json()
}
