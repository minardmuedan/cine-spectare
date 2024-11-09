'use client'

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { useAuthToken } from '@/hooks/auth-token'
import { ChevronRightIcon } from 'lucide-react'
import ChangeEmailForm from './form'
import VerificationForm from '@/components/authentications/verification-form'
import { changeEmailAction } from './action'
import { toast } from 'sonner'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export default function ChangeEmailDialog() {
  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const { token, setToken } = useAuthToken()

  const header =
    token?.type === 'change-email'
      ? { title: 'Enter Code', description: 'Check new email for verification code' }
      : { title: 'Change Email', description: 'Input your credentials and verify the new email' }
  const content =
    token?.type === 'change-email' ? (
      <VerificationForm
        action={changeEmailAction}
        onSuccessFn={() => {
          setModalOpen(false)
          setToken(null)
          toast.success('Email Updated Successfully')
          queryClient.invalidateQueries({ queryKey: ['session'] })
        }}
      />
    ) : (
      <ChangeEmailForm />
    )

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger variant="outline" className="mb-2 h-14 w-full justify-between">
        Change Email
        <ChevronRightIcon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader {...header} className="justify-center *:text-center" />
        {content}
      </DialogContent>
    </Dialog>
  )
}
