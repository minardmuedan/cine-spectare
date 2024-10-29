import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { useServerActionMutation } from '@/hooks/server-action'
import { useIsMutating } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { resendVerificationTokenAction } from './action'
import { toast } from 'sonner'
import { useCountdown } from '@/hooks/countdown'
import { useAuthToken } from '@/hooks/auth-token'

export default function ResendTokenFooter() {
  const { timeLeft, setTimeLeft } = useCountdown()
  const { token, setToken } = useAuthToken()

  const isVerifying = useIsMutating({ mutationKey: ['auth', 'verification'], exact: true }) > 0

  const { mutate, isPending } = useServerActionMutation(resendVerificationTokenAction, {
    mutationKey: ['auth', 'resend-token'],
    onSuccess: () => setTimeLeft(30),
    onError: err => {
      if (err.code == 'NOT_FOUND') setToken(null)
      toast.error(err.message)
    },
  })

  return (
    <CardFooter className="relative justify-center text-center text-sm text-muted-foreground">
      <div className={`absolute flex items-center gap-2 transition-transform ${isVerifying ? 'scale-100' : 'scale-0'}`}>
        <p>verifying</p>
        <Loader2Icon size={16} className="animate-spin" />
      </div>

      <div className={`transition-transform *:inline-block ${isVerifying ? 'scale-0' : 'scale-100'}`}>
        <p>didn&#39;t recieve any code?</p>{' '}
        <Button disabled={timeLeft > 0 || isPending} variant="link" onClick={() => mutate({ tokenId: token!.id })} className="size-fit p-0">
          {timeLeft > 0 ? `resend in ${timeLeft}` : 'resend'}
        </Button>
      </div>
    </CardFooter>
  )
}
