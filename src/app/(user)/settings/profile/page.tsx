import Back from '@/components/back-button'
import UnauthorizedUi from '@/components/pages/unauthorized'
import { UserAvatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { validateSession } from '@/lib/session/validate'

export default async function UserProfilePage() {
  const { user } = await validateSession()
  if (!user) return <UnauthorizedUi />

  return (
    <div className="max-w-[700px] flex-1 space-y-3 p-2">
      <Back className="md:hidden" />

      <h2 className="mb-5 text-muted-foreground">Your Profile</h2>

      <UserAvatar {...user} className="size-20" />

      <p>
        <span className="text-muted-foreground">email : </span>
        {user.email}
      </p>

      <form>
        <Label>Username</Label>
        <Input placeholder="no username" defaultValue={user.name ?? undefined} className="mb-6 mt-2" />

        <Button disabled className="w-full md:w-fit">
          Update Profile
        </Button>
      </form>
    </div>
  )
}
