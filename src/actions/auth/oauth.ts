'use server'

import { github, google } from '@/lib/auth/oauth-provider'
import { setCookie } from '@/lib/auth/helpers/headers'
import { generateCodeVerifier, generateState } from 'arctic'
import { redirect } from 'next/navigation'
import { createServerAction } from 'zsa'

export const signInWithGoogleAction = createServerAction().handler(async () => {
  await new Promise(res => setTimeout(res, 5000))

  const state = generateState()
  const codeVerifier = generateCodeVerifier()
  const url = await google.createAuthorizationURL(state, codeVerifier, { scopes: ['profile', 'email'] })

  cookiesStateSetter('google_oauth_state', state)
  cookiesStateSetter('code_verifier', codeVerifier)
  redirect(url.toString())
})

export const signInWithGithubAction = createServerAction().handler(async () => {
  await new Promise(res => setTimeout(res, 5000))

  const state = generateState()
  const url = await github.createAuthorizationURL(state, {
    scopes: ['user:email'],
  })

  cookiesStateSetter('github_oauth_state', state)
  redirect(url.toString())
})

function cookiesStateSetter(key: string, value: string) {
  setCookie(key, value, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })
}
