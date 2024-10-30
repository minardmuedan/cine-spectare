'use client'

import { CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import AuthButton from '../components/auth-button'
import { continueWithGithubAction, continueWithGoogleAction } from './action'
import { useMutation } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'

export default function OauthFooter() {
  const providers = [
    { label: 'Google', mutation: useMutation({ mutationFn: continueWithGoogleAction, mutationKey: ['auth', 'google-login'] }) },
    { label: 'Github', mutation: useMutation({ mutationFn: continueWithGithubAction, mutationKey: ['auth', 'github-login'] }) },
  ]

  return (
    <CardFooter className="w-full flex-col">
      <div className="relative flex w-full justify-center after:absolute after:left-0 after:top-1/2 after:w-full after:-translate-y-1/2 after:border-t after:border-border">
        <p className="relative z-10 w-fit bg-background px-2 text-sm text-muted-foreground">
          or <span className="hidden md:inline-block">continue with</span>
        </p>
      </div>

      <div className="mt-6 flex w-full flex-col gap-2 md:flex-row">
        {providers.map(({ label, mutation }, i) => (
          <AuthButton key={i} variant={i == 0 ? 'secondary' : 'outline'} onClick={() => mutation.mutate()} className="h-12 w-full gap-3 md:flex-1">
            {mutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <Image src={`/${label.toLowerCase()}.svg`} alt={`${label} icon`} height={16} width={16} className={`${i == 1 && 'invert'}`} />
            )}
            <p>
              <span className="text-muted-foreground md:hidden">Continue with</span> {label}
            </p>
          </AuthButton>
        ))}
      </div>
    </CardFooter>
  )
}
