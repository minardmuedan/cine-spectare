import { CookieAttributes } from 'oslo/cookie'
import { cookies, headers } from 'next/headers'

export const setCookie = async (key: string, value: string, attributes: CookieAttributes) => {
  const cookieStore = await cookies()
  cookieStore.set(key, value, attributes)
}

export const getCookie = async (key: string) => {
  const cookieStore = await cookies()
  return cookieStore.get(key)?.value
}

export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies()
  cookieStore.delete(key)
}

export const getIpAddress = async () => {
  const headersStore = await headers()
  const forwardedFor = headersStore.get('x-forwarded-for')
  return (forwardedFor ? forwardedFor.split(',')[0].trim() : headersStore.get('x-real-ip')) ?? null
}
