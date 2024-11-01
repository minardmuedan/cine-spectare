import { clientFetcher } from '@/lib/helpers/client-fetcher'
import { useIsMutating, useQuery, useQueryClient } from '@tanstack/react-query'
import { useServerActionMutation } from './server-action'
import { toggleLikeAction } from '@/actions/media/toggle-like'
import { toast } from 'sonner'

export type TUserDbMedia = { id: string; type: 'movie' | 'tv'; mediaId: number }

const queryKey = ['media', 'likes']
const mutationKey = ['media', 'toggle-like']

export const useLikes = () => useQuery({ queryKey, queryFn: () => clientFetcher<TUserDbMedia[]>('/api/user/likes') })

export const useLikeMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useServerActionMutation(toggleLikeAction, {
    mutationKey,
    onMutate: () => {
      queryClient.cancelQueries({ queryKey })
      return queryClient.getQueryData(queryKey)
    },
    onError: (err, _v, old) => (toast.error(err.message), queryClient.setQueryData(queryKey, old)),
    onSuccess: (_d, variables) => {
      const optimisticData = { id: 'pending placeholder', type: variables.type, mediaId: variables.id }
      queryClient.setQueryData<TUserDbMedia[]>(queryKey, old => old && [optimisticData, ...old])
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
  return mutation
}

export const useIsLikeMutating = () => useIsMutating({ mutationKey }) > 0
