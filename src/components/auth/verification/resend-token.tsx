import { resendTokenAction } from '@/actions/auth/verification'
import { Button } from '@/components/ui/button'
import { useCountDown } from '@/hooks/countdown'
import { useServerActionMutation } from '@/lib/utils/server-mutation'
import { toast } from 'sonner'

export default function ResendTokenButton({ tokenId, deleteToken }: { tokenId: string; deleteToken: () => void }) {
  const { timeLeft, setTimeLeft } = useCountDown()
  const { mutate, isPending } = useServerActionMutation(resendTokenAction, {
    mutationKey: ['resend-token'],
    onError: (err) => {
      if (err.code === 'NOT_FOUND') deleteToken()
      toast.error(err.message)
    },
    onSuccess: ({ remainingSeconds }) => {
      setTimeLeft(remainingSeconds)
      toast.success('Email verification code sent!')
    },
  })

  return (
    <Button disabled={timeLeft > 0 || isPending} variant="link" className="size-fit p-0" onClick={() => mutate(tokenId)}>
      {timeLeft > 0 ? `resend in ${timeLeft} seconds` : 'resend'}
    </Button>
  )
}
