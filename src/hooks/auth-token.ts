import { create } from 'zustand'

type AuthToken = { type: 'signup' | 'forgot-password'; id: string; purpose: 'verification' | 'create-password' } | null

type AuthTokenStore = {
  token: AuthToken
  setToken: (token: AuthToken) => void
}

export const useAuthToken = create<AuthTokenStore>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}))
