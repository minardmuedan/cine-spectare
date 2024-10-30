'use server'

import { generateCodeVerifier, generateState } from 'arctic'
import { redirect } from 'next/navigation'
import { oauthSetCookie } from '../_helpers'
import { github, google } from './provider'

export const continueWithGoogleAction = async () => {
  const state = generateState()
  const codeVerifier = generateCodeVerifier()

  await oauthSetCookie('google_oauth_state', state)
  await oauthSetCookie('google_code_verifier', codeVerifier)

  const scopes = ['profile', 'email']
  const url = google.createAuthorizationURL(state, codeVerifier, scopes)

  redirect(url.toString())
}

export const continueWithGithubAction = async () => {
  const state = generateState()
  const url = github.createAuthorizationURL(state, ['user:email'])

  await oauthSetCookie('github_oauth_state', state)
  redirect(url.toString())
}
