import Back from '@/components/back-button'
import UnauthorizedUi from '@/components/pages/unauthorized'
import Profile from '@/features/settings/profile'
import { validateSession } from '@/lib/session/validate'

export default async function UserProfilePage() {
  await new Promise(res => setTimeout(res, 5000))

  const { user } = await validateSession()
  if (!user) return <UnauthorizedUi className="min-h-full" />

  return (
    <div className="flex-1">
      <Back className="mb-3 md:hidden" />
      <h2 className="mb-5 text-muted-foreground">Your Profile</h2>

      <Profile user={user} />
    </div>
  )
}
