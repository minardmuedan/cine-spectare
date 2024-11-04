import Back from '@/components/back-button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function UserPreferencesPage() {
  return (
    <div className="max-w-[700px] flex-1 space-y-3 p-2">
      <Back className="md:hidden" />

      <h2 className="mb-5 text-muted-foreground">Your Preferences</h2>

      <ul className="flex flex-col gap-3 *:flex *:items-center *:gap-3">
        <li>
          <Switch id="save-history" />
          <Label htmlFor="save-history">Save History</Label>
        </li>

        <li>
          <Switch id="include-adult" />
          <Label htmlFor="include-adult">Include Adult</Label>
        </li>
      </ul>
    </div>
  )
}
