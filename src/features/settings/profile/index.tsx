'use client'

import { UserAvatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useServerActionMutation } from '@/hooks/server-action'
import { TSessionUser } from '@/lib/session/_type'
import { useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import { updateUserProfileAction } from './action'
import { Loader2Icon } from 'lucide-react'

export default function Profile({ user }: { user: TSessionUser }) {
  const queryClient = useQueryClient()
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState<File | undefined>(undefined)
  const [avatarUrl, setAvatarUrl] = useState('')

  const { mutate, isPending } = useServerActionMutation(updateUserProfileAction, {
    mutationKey: ['update-profile'],
    onSuccess: () => toast.success('Profile Update Successfully'),
    onError: err => toast.error(err.message),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] })
      setAvatar(undefined)
      setUsername('')
    },
  })

  const handleImageOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) return toast.error('File exceeds the maximum allowed size of 2 MB')

      setAvatar(file)
      setAvatarUrl(URL.createObjectURL(file))
    }
  }

  return (
    <form
      className="flex max-w-[700px] flex-col gap-6 py-10 md:py-0"
      onSubmit={e => {
        e.preventDefault()
        mutate({ username: username || user.name, avatar })
      }}
    >
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <UserAvatar
          name={user.name}
          avatarUrl={avatarUrl ? avatarUrl : user.avatarUrl}
          email={user.email}
          provider={user.provider}
          className="size-20"
        />

        <Input id="avatarInput" name="avatartInput" type="file" accept="image/*" className="hidden" onChange={handleImageOnChange} />
        <Button variant="link" asChild>
          <Label htmlFor="avatarInput" className="cursor-pointer">
            Change Avatar
          </Label>
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="usernameInput">Username</Label>
        <Input
          id="usernameInput"
          placeholder={user.name ? 'Input your username' : 'no username'}
          defaultValue={user.name ?? undefined}
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      <Button disabled={isPending || (!avatar && (!username || username === user.name))} className="w-full md:w-fit">
        Update Profile {isPending && <Loader2Icon className="animate-spin" />}
      </Button>
    </form>
  )
}
