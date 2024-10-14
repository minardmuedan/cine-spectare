'use client'

import { useServerActionMutation } from '@/lib/utils/server-mutation'
import { Button, ButtonProps } from '../ui/button'
import { signOutAction } from '@/actions/auth/signout'
import { Loader2Icon, LogOutIcon } from 'lucide-react'

export default function SignOutButton({ variant, ...props }: ButtonProps) {
  const { mutate, isPending } = useServerActionMutation(signOutAction, { mutationKey: ['auth', 'signout'] })
  return (
    <Button
      {...props}
      variant={variant || 'outline'}
      disabled={isPending}
      onClick={() => mutate(undefined)}
      className={'gap-3 border-2 border-destructive text-destructive hover:bg-destructive/50'}
    >
      Logout {isPending ? <Loader2Icon size={16} className="animate-spin" /> : <LogOutIcon size={16} />}
    </Button>
  )
}
