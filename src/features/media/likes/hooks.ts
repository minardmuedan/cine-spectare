import { toggleLikeAction } from './action'
import { clientFetcher } from '@/lib/helpers/client-fetcher'
import { useIsMutating, useQuery } from '@tanstack/react-query'
import { useCreateMediaMutation } from '../helpers/mutation'
import { TUserDbMedia } from '../type'

const queryKey = ['media', 'likes']
const mutationKey = ['media', 'toggle-like']

export const useLikes = () => useQuery({ queryKey, queryFn: () => clientFetcher<TUserDbMedia[]>('/user/likes') })

export const useLikeMutation = () => useCreateMediaMutation(queryKey, mutationKey, toggleLikeAction)

export const useIsLikeMutating = () => useIsMutating({ mutationKey }) > 0
