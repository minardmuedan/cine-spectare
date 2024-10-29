import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { PanelRightIcon } from 'lucide-react'

export default function Devtools() {
  return (
    <Sheet>
      <SheetTrigger>
        <PanelRightIcon size={19.2} />
        <span className="sr-only">show react devtools panel</span>
      </SheetTrigger>
      <SheetContent className="min-w-fit pt-10">
        <SheetHeader className="sr-only">
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>

        <ReactQueryDevtoolsPanel />
      </SheetContent>
    </Sheet>
  )
}
