import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp'
import { useAuthToken } from '@/hooks/auth-token'
import { useServerActionMutation } from '@/hooks/server-action'
import { useRef, useState } from 'react'
import FormError from '@/components/ui/form-error'
import { toast } from 'sonner'
import { useCountdown } from '@/hooks/countdown'
import { THandlerFunc } from 'zsa'
import { ZodIntersection } from 'zod'
import { codeSchema, tokenIdSchema } from '@/lib/schema'
import ResendToken from './resend-token'

type ServerAction = THandlerFunc<
  ZodIntersection<typeof tokenIdSchema, typeof codeSchema>,
  undefined,
  'ShapeErrorNotSet',
  Promise<{ isExceed: true; remainingSeconds: number } | undefined>,
  undefined,
  'json',
  false
>

export default function VerificationForm({ action, onSuccessFn }: { action: ServerAction; onSuccessFn: () => void }) {
  const { token, setToken } = useAuthToken()
  const { timeLeft, setTimeLeft } = useCountdown()

  const ref = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState('')

  const { mutate, isPending, error } = useServerActionMutation(action, {
    mutationKey: ['auth', 'verification'],
    onError: err => err.code == 'NOT_FOUND' && (setToken(null), toast.error(err.message)),
    onSuccess: data => {
      if (data?.isExceed) return setTimeLeft(data.remainingSeconds)
      onSuccessFn()
    },
    onSettled: () => {
      setValue('')
      setTimeout(() => ref?.current?.focus(), 300)
    },
  })

  return (
    <div className="flex flex-col items-center">
      <FormError error={error?.message} className="min-w-[280px]" />

      {timeLeft > 0 ? (
        <p className="flex h-10 items-center text-destructive">Please wait for {timeLeft} second/s to try again</p>
      ) : (
        <InputOTP
          disabled={timeLeft > 0 || isPending}
          maxLength={6}
          autoFocus
          ref={ref}
          value={value}
          onChange={setValue}
          onComplete={code => mutate({ tokenId: token!.id, code })}
        >
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTP>
      )}

      <ResendToken />
    </div>
  )
}
