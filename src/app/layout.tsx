import localFont from 'next/font/local'
import { Poppins } from 'next/font/google'
import './globals.css'

import { Toaster } from '@/components/ui/sonner'
import ReactQueryProvider from '@/components/providers/react-query'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const bolota = localFont({ src: './Bolota.ttf', variable: '--font-bolota' })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata = { title: 'CineSpectare', description: 'Fullstack Movies and Tv Shows Browsing website, made by Minard Parilla' }

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${bolota.variable} antialiased`}>
        <ReactQueryProvider>
          <Toaster richColors position="top-right" closeButton />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  )
}

type Props = Readonly<{ children: React.ReactNode }>
