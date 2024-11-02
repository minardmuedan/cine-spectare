import { Button } from '@/components/ui/button'
import { useAuthToken } from '@/hooks/auth-token'
import { useServerActionMutation } from '@/hooks/server-action'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import FormError from '../components/form-error'
import CreatePasswordInput from '../components/password-input'
import { passwordSchema } from '../schema'
import { changePasswordAction } from './action'

export default function ChangePasswordForm({ closeModal }: { closeModal: () => void }) {
  const { token, setToken } = useAuthToken()
  const [value, setValue] = useState('')
  const [typeError, setTypeError] = useState(passwordSchema.safeParse({ password: '' }).error?.flatten().fieldErrors.password)

  const { mutate, isPending, error } = useServerActionMutation(changePasswordAction, {
    mutationKey: ['auth', 'change-password'],
    onError: err => err.code == 'NOT_FOUND' && (setToken(null), toast.error(err.message)),
    onSuccess: () => (closeModal(), setToken(null), toast.success('Password Updated Successfully! Try to Login')),
  })

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        mutate({ tokenId: token!.id, password: value })
      }}
    >
      <FormError error={error?.fieldErrors?.password?.[0] || error?.message} />

      <CreatePasswordInput {...{ value, setValue, typeError, setTypeError }} />
      <Button type="submit" disabled={typeError != undefined || isPending} className="mt-6 w-full">
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
