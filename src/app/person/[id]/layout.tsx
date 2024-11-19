import Back from '@/components/back-button'
import { H2 } from '@/components/typography'
type Props = { children: React.ReactNode; credits: React.ReactNode; images: React.ReactNode }

export default function PersonLayout({ children, credits, images }: Props) {
  return (
    <div className="container relative p-2 md:px-5 lg:px-10">
      <Back className="mb-10" />
      <section className="flex flex-col gap-10 md:flex-row md:gap-5">{children}</section>

      <section className="flex gap-5 pt-20">{credits}</section>
      <section className="flex pt-20">
        <div className="w-full md:max-w-sm">
          <H2 className="mb-4">Profiles</H2>
          {images}
        </div>
      </section>
    </div>
  )
}
