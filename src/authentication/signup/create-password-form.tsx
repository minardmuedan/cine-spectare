import { useState } from 'react'
import CreatePasswordInput from '../components/password-input'
import { passwordSchema } from '../schema'
import { Button } from '@/components/ui/button'
import { useServerActionMutation } from '@/hooks/server-action'
import { createPasswordAction } from './action'
import { Loader2Icon } from 'lucide-react'
import FormError from '../components/form-error'
import { toast } from 'sonner'
import { useAuthToken } from '@/hooks/auth-token'
import { useQueryClient } from '@tanstack/react-query'

export default function CreatePasswordForm() {
  const { token, setToken } = useAuthToken()
  const [value, setValue] = useState('')
  const [typeError, setTypeError] = useState(passwordSchema.safeParse({ password: '' }).error?.flatten().fieldErrors.password)

  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useServerActionMutation(createPasswordAction, {
    mutationKey: ['auth', 'create-password'],
    onError: err => err.code == 'NOT_FOUND' && (setToken(null), toast.error(err.message)),
    onSettled: (_data, error) => {
      if (!error?.data) {
        queryClient.clear()
        toast.success('Congratulations! Account Created Successfully.', { icon: '🎉' })
        setTimeout(() => setToken(null), 1500)
      }
    },
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
            <p>Creating Account</p>
            <Loader2Icon size={16} className="animate-spin" />
          </>
        ) : (
          'Complete Signup!'
        )}
      </Button>
    </form>
  )
}
