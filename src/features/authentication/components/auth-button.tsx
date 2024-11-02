'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { useIsMutating } from '@tanstack/react-query'

export default function AuthButton({ disabled, children, ...props }: ButtonProps) {
  const authMutating = useIsMutating({ mutationKey: ['auth'] })
  return (
    <Button {...props} disabled={authMutating > 0 || disabled}>
      {children}
    </Button>
  )
}
