import { toggleWatchLaterAction } from './action'
import { clientFetcher } from '@/lib/helpers/client-fetcher'
import { useIsMutating, useQuery } from '@tanstack/react-query'
import { useCreateMediaMutation } from '../helpers/mutation'
import { TUserDbMedia } from '../type'

const queryKey = ['media', 'watch-later']
const mutationKey = ['media', 'toggle-watch-later']

export const useWatchLater = () => useQuery({ queryKey, queryFn: () => clientFetcher<TUserDbMedia[]>('/user/watch-later') })

export const useWatchLaterMutation = () => useCreateMediaMutation(queryKey, mutationKey, toggleWatchLaterAction)

export const useIsWatchLaterMutating = () => useIsMutating({ mutationKey }) > 0
