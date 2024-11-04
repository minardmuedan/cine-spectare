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
    <AuthButton variant="ghost" onClick={() => mutate(undefined)} className="hover:text-destructive-/75 text-destructive hover:bg-destructive/25">
      <LogOutIcon />
      Logout
    </AuthButton>
  )
}
