import { create } from 'zustand'

type AuthToken = {
  id: string
  ui: 'verification' | 'creatingPassword' | 'changingPassword'
  type: 'signup' | 'forgot-password'
}

type AuthTokenStore = {
  token: AuthToken | null
  setToken: (param: AuthToken | null) => void
}

export const useAuthToken = create<AuthTokenStore>(set => ({
  token: null,
  setToken: token => set({ token }),
}))
