import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogInIcon } from 'lucide-react'

export default function LoginForm() {
  return (
    <form>
      <Label htmlFor="emailInput">Email Address</Label>
      <Input id="emailInput" name="emailInput" placeholder="minard@gmail.com" className="mb-6 mt-2" />

      <Label htmlFor="passwordInput">Password</Label>
      <Input id="passwordInput" name="passwordInput" placeholder="********" className="mb-6 mt-2" />

      <Button type="submit" className="w-full">
        Login
        <LogInIcon />
      </Button>
    </form>
  )
}
