import { CookieAttributes } from 'oslo/cookie'
import { cookies, headers } from 'next/headers'

export const setCookie = (key: string, value: string, attributes: CookieAttributes) => cookies().set(key, value, attributes)
export const getCookie = (key: string) => cookies().get(key)?.value
export const deleteCookie = (key: string) => cookies().delete(key)

export function getIpAddress() {
  const forwardedFor = headers().get('x-forwarded-for')
  return (forwardedFor ? forwardedFor.split(',')[0].trim() : headers().get('x-real-ip')) ?? null
}
