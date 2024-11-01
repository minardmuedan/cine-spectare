import { clientFetcher } from '@/lib/helpers/client-fetcher'
import { TSessionUser } from '@/lib/session/_type'
import { useQuery } from '@tanstack/react-query'

export const useSession = () => useQuery({ queryKey: ['session'], queryFn: () => clientFetcher<TSessionUser | null>('/api/user/session') })
