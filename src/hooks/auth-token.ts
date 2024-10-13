import { create } from 'zustand'

type Token = { type: 'signup' | 'forgot-password'; id: string; purpose: 'verification' | 'create-password' } | null

type AuthToken = {
  token: Token
  setToken: (token: Token) => void
}

export const useAuthToken = create<AuthToken>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}))
