import { verificationAction } from '@/actions/auth/verification'
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp'
import { useCountDown } from '@/hooks/countdown'
import { useServerActionMutation } from '@/lib/utils/server-mutation'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import FormError from '../error'
import InputOTPTimer, { InputOTPLoadingFallback } from './_components'
import ResendTokenButton from './resend-token'

type Props = { tokenId: string; onSuccessFn: () => void; deleteToken: () => void }

export default function OtpVerification({ tokenId, onSuccessFn, deleteToken }: Props) {
  const { timeLeft, setTimeLeft } = useCountDown()

  const { mutate, isPending, isError, error } = useServerActionMutation(verificationAction, {
    mutationKey: ['auth', 'verification'],
    onError: (err) => {
      if (err.code == 'NOT_FOUND') {
        deleteToken()
        toast.error(err.message)
      }
    },
    onSuccess: (data) => {
      if (data?.isExceed) return setTimeLeft(data.remainingSeconds)
      onSuccessFn()
    },
  })
  return (
    <div className="flex flex-col items-center">
      <div>
        {isError && error.code !== 'NOT_FOUND' && <FormError message={error.message} className="w-fit min-w-72 max-w-full" />}
        {timeLeft > 0 ? (
          <InputOTPTimer timeLeft={timeLeft} />
        ) : isPending ? (
          <InputOTPLoadingFallback />
        ) : (
          <InputOTP maxLength={6} autoFocus onComplete={(value) => mutate({ tokenId, code: value })}>
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} className="pointer-events-none" />
            ))}
          </InputOTP>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <div className={` ${isPending ? '' : 'hidden'}`}>
          <span className="sr-only">validating</span>
          <Loader2Icon size={20} className="animate-spin" />
        </div>

        <div className={`flex items-center gap-1 ${isPending ? 'hidden' : ''}`}>
          <p>didn&#39;t recieve any code?</p>
          <ResendTokenButton tokenId={tokenId} deleteToken={deleteToken} />
        </div>
      </div>
    </div>
  )
}
