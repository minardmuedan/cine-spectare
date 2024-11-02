import { Google, GitHub } from 'arctic'

export const google = new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, process.env.GOOGLE_REDIRECT_URI!)
export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!, null)

export type TGoogleUser = { sub: string; name: string | null; picture: string | null; email: string }
export type TGithubUser = { id: string; login: string | null; avatar_url: string | null }
export type TGithubUserEmails = [{ email: string; primary: boolean; verified: boolean; visibility: 'public' | 'private' | null }]
