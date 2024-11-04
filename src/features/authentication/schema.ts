import { z } from 'zod'

export const emailSchema = z.object({ email: z.string().email() })

const password = z
  .string()
  .min(8, 'At least 8 characters long')
  .max(255, '255 characters max')
  .regex(/[A-Z]/, 'Must contain one uppercase letter')
  .regex(/[a-z]/, 'Must contain one lowercase letter')
  .regex(/[0-9]/, 'Must contain one digit')
  .regex(/^[^\s]+$/, 'Must not contain spaces')

export const passwordSchema = z.object({ password })

export const loginSchema = emailSchema.and(z.object({ password: z.string().min(1, 'Password is required') }))

export const changePasswordSchema = z.object({ currentPassword: z.string().min(1, 'Current password is required'), newPassword: password })
