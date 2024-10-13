'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({ defaultOptions: { mutations: { gcTime: 10000 } } })

export default function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...props} defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
