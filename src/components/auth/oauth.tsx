import Image from 'next/image'
import AuthButton from './auth-button'

export default function Oauth() {
  return (
    <div className="flex w-full flex-col gap-3 *:h-12 *:gap-3 sm:flex-row sm:*:flex-1">
      <AuthButton variant="secondary">
        <Image src="/google.svg" height={18} width={18} alt="github icon" />
        <p>
          <span className="text-muted-foreground sm:hidden">Continue with </span>
          Google
        </p>
      </AuthButton>
      <AuthButton variant="outline">
        <Image src="/github.svg" height={18} width={18} alt="github icon" className="dark:invert" />
        <p>
          <span className="text-muted-foreground sm:hidden">Continue with </span>
          Github
        </p>
      </AuthButton>
    </div>
  )
}
