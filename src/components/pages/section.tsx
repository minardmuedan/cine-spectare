import { cn } from '@/lib/utils'

export default function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn('relative p-2 md:px-5 lg:px-10', className)}>{children}</section>
}
