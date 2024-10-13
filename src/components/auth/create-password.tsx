'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import CreatePasswordInput from './password-input'
import { passwordSchema } from '@/lib/schema/auth'
import { Button } from '../ui/button'
import { useServerActionMutation } from '@/lib/utils/server-mutation'
import { createPasswordAction } from '@/actions/auth/signup'
import { toast } from 'sonner'
import { useAuthToken } from '@/hooks/auth-token'
import { Loader2Icon } from 'lucide-react'

export default function CreatePassword() {
  const { token, setToken } = useAuthToken()
  const [value, setValue] = useState('')
  const [typeError, setTypeError] = useState(passwordSchema.safeParse({ password: '' }).error?.flatten().fieldErrors.password)

  const { mutate, isPending } = useServerActionMutation(createPasswordAction, {
    mutationKey: ['create-password'],
    onError: (err) => {
      if (err.code == 'NOT_FOUND') {
        setToken(null)
        toast.error(err.message)
      }
    },
    onSuccess: () => {
      setToken(null)
      toast.success('Congratulations! Account Created Successfully.', { icon: '🎉' })
    },
  })

  return (
    <Card>
      <CardHeader title="Create A Password" description="Finish setting up your account" />
      <CardContent>
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
                <p>Creating Account</p>
                <Loader2Icon size={16} className="animate-spin" />
              </>
            ) : (
              'Complete Signup!'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
