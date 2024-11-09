import { Suspense } from 'react'
import UserProfilePage from './profile/page'
import SettingsLoading from './loading'

export default function SettingsPage() {
  return (
    <div className="hidden flex-1 md:block">
      <Suspense fallback={<SettingsLoading />}>
        <UserProfilePage />
      </Suspense>
    </div>
  )
}
