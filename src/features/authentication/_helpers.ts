import { setCookie } from '@/lib/helpers/headers'

export const oauthSetCookie = async (key: string, value: string) => {
  await setCookie(key, value, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 5,
    sameSite: 'lax',
  })
}
