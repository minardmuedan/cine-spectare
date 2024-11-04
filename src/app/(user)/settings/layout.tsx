import Section from '@/components/pages/section'
import SettingsSideNav from '@/features/settings/components/side-navbar'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section className="flex min-h-[calc(100dvh-3.5rem)] justify-start gap-4">
      <SettingsSideNav />
      {children}
    </Section>
  )
}
