export type TSessionUser = {
  name: string | null
  email: string
  avatarUrl: string | null
  provider: 'credentials' | 'google' | 'github'
}

export type TSession = {
  id: string
  userId: string
  ipAddress: string | null
  expiresAt: Date
  createdAt: Date
}
