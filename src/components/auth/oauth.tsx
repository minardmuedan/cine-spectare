'use client'

import Image from 'next/image'
import AuthButton from './auth-button'
import { useServerActionMutation } from '@/lib/utils/server-mutation'
import { signInWithGithubAction, signInWithGoogleAction } from '@/actions/auth/oauth'
import { Loader2Icon } from 'lucide-react'

export default function Oauth() {
  const oauths = [
    { title: 'Google', src: 'google', action: useServerActionMutation(signInWithGoogleAction, { mutationKey: ['auth', 'google'] }) },
    { title: 'Github', src: 'github', action: useServerActionMutation(signInWithGithubAction, { mutationKey: ['auth', 'github'] }) },
  ] as const

  return (
    <div className="flex w-full flex-col gap-3 *:h-12 *:gap-3 sm:flex-row sm:*:flex-1">
      {oauths.map(({ title, src, action }, i) => (
        <AuthButton key={i} variant={i === 0 ? 'secondary' : 'outline'} onClick={() => action.mutate(undefined)}>
          <Image src={`/${src}.svg`} height={18} width={18} alt={`${title} icon`} className={i === 1 ? 'dark:invert' : ''} />
          <div className="*:inline-block">
            <p className="text-muted-foreground sm:hidden">Continue with</p>{' '}
            {action.isPending ? <Loader2Icon size={16} className="animate-spin" /> : title}
          </div>
        </AuthButton>
      ))}
    </div>
  )
}
