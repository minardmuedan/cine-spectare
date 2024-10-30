export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <section className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center">{children}</section>
}
