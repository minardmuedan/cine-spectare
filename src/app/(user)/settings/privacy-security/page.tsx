import Back from '@/components/back-button'
import UnauthorizedUi from '@/components/pages/unauthorized'
import { Button } from '@/components/ui/button'
import ChangeEmailDialog from '@/features/settings/security/change-email'
import ChangePasswordDialog from '@/features/settings/security/change-password/dialog'
import { validateSession } from '@/lib/session/validate'
import { ChevronRightIcon } from 'lucide-react'

export default async function UserPrivacyAndSecurityPage() {
  const { user } = await validateSession()
  if (!user) return <UnauthorizedUi className="min-h-full" />

  return (
    <div className="flex-1">
      <Back className="mb-3 md:hidden" />

      <h2 className="mb-4 mt-0 text-muted-foreground">Privacy & Security</h2>

      {user?.provider !== 'credentials' ? (
        <>
          <Button disabled variant="outline" className="mb-2 h-14 w-full justify-between">
            Change Email
            <ChevronRightIcon />
          </Button>
          <Button disabled variant="outline" className="h-14 w-full justify-between">
            Change Password
            <ChevronRightIcon />
          </Button>
        </>
      ) : (
        <>
          <ChangeEmailDialog />
          <ChangePasswordDialog />
        </>
      )}
    </div>
  )
}
