import Back from '@/components/back-button'
import UnauthorizedUi from '@/components/pages/unauthorized'
import Profile from '@/features/settings/profile'
import { validateSession } from '@/lib/session/validate'

export default async function UserProfilePage() {
  const { user } = await validateSession()
  if (!user) return <UnauthorizedUi className="min-h-full" />

  return (
    <div className="flex-1">
      <Back className="mb-3 md:hidden" />
      <h2 className="mb-4 text-muted-foreground">Your Profile</h2>

      <Profile user={user} />
    </div>
  )
}
