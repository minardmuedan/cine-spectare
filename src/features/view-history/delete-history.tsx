'use client'

import { Button } from '@/components/ui/button'
import { useServerActionMutation } from '@/hooks/server-action'
import { deleteAllViewHistoryAction, deleteViewHistoryAction } from './action'
import { toast } from 'sonner'
import { Loader2Icon, Trash2Icon } from 'lucide-react'

export function DeleteViewHistoryButton({ viewHistoryId }: { viewHistoryId: string }) {
  const { mutate, isPending } = useServerActionMutation(deleteViewHistoryAction, {
    mutationKey: ['delete-view-history'],
    onError: err => toast.error(err.message),
  })

  return (
    <Button size="icon" variant="ghost" disabled={isPending} onClick={() => mutate({ id: viewHistoryId })}>
      {isPending ? <Loader2Icon className="animate-spin" /> : <Trash2Icon />}

      <span className="sr-only">delete this</span>
    </Button>
  )
}

export function DeleteAllViewHistoryButton() {
  const { mutate, isPending } = useServerActionMutation(deleteAllViewHistoryAction, {
    mutationKey: ['delete-all-view-history'],
    onError: err => toast.error(err.message),
  })

  return (
    <Button variant="link" disabled={isPending} onClick={() => mutate(undefined)} className="mb-1">
      Clear{isPending ? 'ing...' : ' All'}
    </Button>
  )
}
