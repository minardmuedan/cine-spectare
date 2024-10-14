import { useIsMutating } from '@tanstack/react-query'
import { Button, ButtonProps } from '../ui/button'

export default function AuthButton({ children, className, disabled, ...props }: ButtonProps) {
  const authMutating = useIsMutating({ mutationKey: ['auth'] })

  return (
    <Button {...props} disabled={disabled || authMutating > 0} className={`w-full ${className || ''}`}>
      {children}
    </Button>
  )
}
