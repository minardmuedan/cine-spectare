import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

export default function SignInPasswordInput() {
  const [hidePassword, setHidePassword] = useState(true)
  return (
    <div className="relative">
      <Input id="passwordInput" type={hidePassword ? 'password' : 'text'} placeholder="********" required className="mt-2 pr-11" />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2"
        onClick={() => setHidePassword(prev => !prev)}
      >
        {hidePassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
      </Button>
    </div>
  )
}
