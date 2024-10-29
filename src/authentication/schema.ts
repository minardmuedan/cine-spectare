import { z } from 'zod'

export const emailSchema = z.object({ email: z.string().email() })

export const codeSchema = z.object({ code: z.string().min(1, 'Verification code is required').max(6) })

export const tokenIdSchema = z.object({ tokenId: z.string().min(1, 'tokenId is required') })

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'At least 8 characters long')
    .max(255, '255 characters max')
    .regex(/[A-Z]/, 'Must contain one uppercase letter')
    .regex(/[a-z]/, 'Must contain one lowercase letter')
    .regex(/[0-9]/, 'Must contain one digit')
    .regex(/^[^\s]+$/, 'Must not contain spaces'),
})
