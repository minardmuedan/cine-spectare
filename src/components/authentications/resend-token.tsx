import { Button } from '@/components/ui/button'
import { useAuthToken } from '@/hooks/auth-token'
import { useCountdown } from '@/hooks/countdown'
import { useServerActionMutation } from '@/hooks/server-action'
import { useIsMutating } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { resendVerificationTokenAction } from '@/actions/verification'

export default function ResendToken() {
  const { timeLeft, setTimeLeft } = useCountdown()
  const { token, setToken } = useAuthToken()

  const isVerifying = useIsMutating({ mutationKey: ['auth', 'verification'] }) > 0

  const { mutate, isPending } = useServerActionMutation(resendVerificationTokenAction, {
    mutationKey: ['auth', 'resend-token'],
    onSuccess: () => setTimeLeft(30),
    onError: err => {
      if (err.code == 'NOT_FOUND') setToken(null)
      toast.error(err.message)
    },
  })

  return (
    <div className="relative mt-6 flex justify-center text-center text-sm text-muted-foreground">
      <div className={`absolute flex items-center gap-2 transition-transform ${isVerifying ? 'scale-100' : 'scale-0'}`}>
        <p>verifying</p>
        <Loader2Icon size={16} className="animate-spin" />
      </div>

      <div className={`transition-transform *:inline-block ${isVerifying ? 'scale-0' : 'scale-100'}`}>
        <p>didn&#39;t recieve any code?</p>{' '}
        <Button
          type="button"
          disabled={timeLeft > 0 || isPending}
          variant="link"
          onClick={() => mutate({ tokenId: token!.id })}
          className="size-fit p-0"
        >
          {timeLeft > 0 ? `resend in ${timeLeft}` : 'resend'}
        </Button>
      </div>
    </div>
  )
}
