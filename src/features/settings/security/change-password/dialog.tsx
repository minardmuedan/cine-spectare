'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CreatePasswordInput from '@/components/authentications/password-input'
import { passwordSchema } from '@/features/authentication/schema'
import { useServerActionMutation } from '@/hooks/server-action'
import { ChevronRightIcon, Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { changePasswordAction } from './action'
import FormError from '@/components/ui/form-error'
import { toast } from 'sonner'

export default function ChangePasswordDialog() {
  const [value, setValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [typeError, setTypeError] = useState(passwordSchema.safeParse({ password: '' }).error?.flatten().fieldErrors.password)

  const { mutate, isPending, error } = useServerActionMutation(changePasswordAction, {
    mutationKey: ['auth', 'change-password'],
    onSuccess: () => (toast.success('Password Updated Successfully'), setIsModalOpen(false), setValue('')),
  })

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className={buttonVariants({ variant: 'outline', className: 'h-14 w-full justify-between' })}>
        Change Password
        <ChevronRightIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title="Change Password" description="Secure your account with a new password" className="justify-center *:text-center" />

        <form
          onSubmit={e => {
            e.preventDefault()
            const currentPassword = e.currentTarget['currentPasswordInput']?.value as string
            mutate({ currentPassword, newPassword: value })
          }}
        >
          <FormError error={error?.fieldErrors?.currentPassword?.[0] || error?.fieldErrors?.newPassword?.[0] || error?.message} />

          <Label htmlFor="currentPasswordInput">Current Password</Label>
          <Input
            id="currentPasswordInput"
            name="currentPasswordInput"
            type="password"
            required
            autoFocus
            autoComplete="off"
            placeholder="********"
            className="mb-6 mt-2"
          />

          <CreatePasswordInput {...{ value, setValue, typeError, setTypeError, autoFocus: false }} />

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
      </DialogContent>
    </Dialog>
  )
}
