import { cn } from '@/lib/utils'
import { InView } from 'react-intersection-observer'

type Props = { section: string; children: React.ReactNode; className?: string; handleInView: () => void }

export default function MediaSection({ section, className, handleInView, ...props }: Props) {
  return (
    <InView
      id={section.split(' & ').join('-').toLowerCase()}
      as="section"
      threshold={0.01}
      rootMargin="-25% 0px -65% 0px"
      onChange={inView => inView && handleInView()}
      className={cn('pt-20', className)}
      {...props}
    />
  )
}
