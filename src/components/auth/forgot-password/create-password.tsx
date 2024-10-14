'use client'

import { updatePasswordAction } from '@/actions/auth/forgot-password'
import { Button } from '@/components/ui/button'
import { useAuthToken } from '@/hooks/auth-token'
import { passwordSchema } from '@/lib/schema/auth'
import { useServerActionMutation } from '@/lib/utils/server-mutation'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import CreatePasswordInput from '../password-input'

export default function ForgotPasswordCreatePassword({ closeModal }: { closeModal: () => void }) {
  const { token, setToken } = useAuthToken()
  const [value, setValue] = useState('')
  const [typeError, setTypeError] = useState(passwordSchema.safeParse({ password: '' }).error?.flatten().fieldErrors.password)

  const { mutate, isPending } = useServerActionMutation(updatePasswordAction, {
    mutationKey: ['create-password'],
    onError: (err) => {
      if (err.code == 'NOT_FOUND') {
        setToken(null)
        toast.error(err.message)
      }
    },
    onSuccess: () => {
      closeModal()
      setToken(null)
      toast.success('Password Updated Successfully! Try to signin')
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        mutate({ tokenId: token!.id, password: value })
      }}
    >
      <CreatePasswordInput value={value} setValue={setValue} typeError={typeError} setTypeError={setTypeError} />

      <Button disabled={typeError != undefined || isPending} className="mt-6 w-full">
        {typeError !== undefined ? (
          'Meet Password Strength Requirements'
        ) : isPending ? (
          <>
            <p>Updating password</p>
            <Loader2Icon size={16} className="animate-spin" />
          </>
        ) : (
          'Update Password'
        )}
      </Button>
    </form>
  )
}
