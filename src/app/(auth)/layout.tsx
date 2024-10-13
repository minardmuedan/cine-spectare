export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="grid min-h-[calc(100dvh-3.5rem)] place-items-center py-10">{children}</div>
}
