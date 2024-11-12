import { clientFetcher } from '@/lib/helpers/client-fetcher'
import { useIsMutating, useQuery } from '@tanstack/react-query'
import { useCreateMediaMutation } from '../../helpers/mutation'
import { TUserDbMedia } from '../../type'
import { toggleAlreadyWatchedAction } from './action'

const queryKey = ['media', 'already-watched']
const mutationKey = ['media', 'toggle-already-watched']

export const useAlreadyWatched = () => useQuery({ queryKey, queryFn: () => clientFetcher<TUserDbMedia[]>('/user/already-watched') })

export const useAlreadyWatchedMutation = () => useCreateMediaMutation(queryKey, mutationKey, toggleAlreadyWatchedAction)

export const useIsAlreadyWatchedMutating = () => useIsMutating({ mutationKey }) > 0
