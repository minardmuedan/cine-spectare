'use client'

import { useServerActionMutation } from '@/hooks/server-action'
import { LogOutIcon } from 'lucide-react'
import { logoutAction } from './action'
import AuthButton from '../components/auth-button'
import { useQueryClient } from '@tanstack/react-query'

export default function LogoutButton() {
  const queryClient = useQueryClient()

  const { mutate } = useServerActionMutation(logoutAction, {
    mutationKey: ['auth', 'logout'],
    onSettled: () => {
      queryClient.clear()
      queryClient.setQueryData(['session'], null)
    },
  })

  return (
    <AuthButton
      variant="outline"
      onClick={() => mutate(undefined)}
      className="border-2 border-destructive text-destructive hover:border-destructive/70 hover:bg-background hover:text-destructive/70"
    >
      Logout
      <LogOutIcon />
    </AuthButton>
  )
}
