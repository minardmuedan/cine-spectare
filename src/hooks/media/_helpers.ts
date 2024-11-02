import { MutationKey, QueryKey, useQueryClient } from '@tanstack/react-query'
import { useServerActionMutation } from '../server-action'
import { TAnyZodSafeFunctionHandler } from 'zsa'
import { toast } from 'sonner'
import { generateId } from '@/lib/helpers/generate'
import { TUserDbMedia } from './_type'

export const useCreateMediaMutation = (queryKey: QueryKey, mutationKey: MutationKey, action: TAnyZodSafeFunctionHandler) => {
  const queryClient = useQueryClient()

  const mutation = useServerActionMutation(action, {
    mutationKey,
    onMutate: newMedia => {
      queryClient.cancelQueries({ queryKey })
      const oldDdata = queryClient.getQueryData<TUserDbMedia[]>(queryKey)

      const existingMedia = oldDdata?.find(media => media.mediaId === newMedia.id)
      if (existingMedia) {
        queryClient.setQueryData<TUserDbMedia[]>(queryKey, old => old && old.filter(media => media.mediaId !== newMedia.id))
        return oldDdata
      }

      const optimisticData = { id: `pending-${generateId()}`, type: newMedia.type, mediaId: newMedia.id }
      queryClient.setQueryData<TUserDbMedia[]>(queryKey, old => old && [optimisticData, ...old])
      return oldDdata
    },
    onError: (err, _v, old) => {
      toast.error(err.message)
      queryClient.setQueryData(queryKey, old)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return mutation
}
