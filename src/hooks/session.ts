import { TSessionUser } from '@/lib/session/_type'
import { useQuery } from '@tanstack/react-query'

const fetcher = async () => {
  const res = await fetch('/api/user/session')
  const data = await res.json()
  return data as TSessionUser | null
}

export const useSession = () => useQuery({ queryKey: ['session'], queryFn: fetcher })
