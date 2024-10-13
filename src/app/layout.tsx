import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Provider from '@/components/provider'
import { Toaster } from '@/components/ui/sonner'

const bolota = localFont({ src: './Bolota Bold.ttf', variable: '--font-bolota' })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = { title: 'CineSpectare', description: 'Fullstack Movie & Tv Show browsing website made by Minard Parilla.' }

type RootLayoutProps = Readonly<{ children: React.ReactNode }>
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} ${bolota.variable} antialiased`}>
        <Provider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <Toaster richColors position="bottom-right" />
          {children}
        </Provider>
      </body>
    </html>
  )
}
