'use client'

import { useRouter } from 'next/navigation'
import { BackButton, ButtonProps } from './ui/button'

export default function Back({ ...props }: Omit<ButtonProps, 'onClick'>) {
  const router = useRouter()
  return <BackButton {...props} onClick={() => router.back()} />
}
