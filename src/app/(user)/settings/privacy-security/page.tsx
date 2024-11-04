import Back from '@/components/back-button'
import { Button } from '@/components/ui/button'
import ChangePasswordDialog from '@/features/settings/security/change-password/dialog'
import { validateSession } from '@/lib/session/validate'
import { ChevronRightIcon } from 'lucide-react'

export default async function UserPrivacyAndSecurityPage() {
  const { user } = await validateSession()

  return (
    <div className="max-w-[700px] flex-1 space-y-3 p-2">
      <Back className="md:hidden" />

      <h2 className="mb-5 text-muted-foreground">Privacy & Security</h2>

      <Button disabled variant="outline" className="h-14 w-full justify-between">
        Change Email
        <ChevronRightIcon />
      </Button>

      {user?.provider !== 'credentials' ? (
        <Button disabled variant="outline" className="h-14 w-full justify-between">
          Change Password
          <ChevronRightIcon />
        </Button>
      ) : (
        <ChangePasswordDialog />
      )}
    </div>
  )
}
