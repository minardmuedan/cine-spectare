import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string().email('Email is Invalid'),
})

export const signInInputSchema = emailSchema.and(
  z.object({
    password: z.string().min(1, 'Password is required'),
  }),
)

export const idSchema = z.string()

export const verificationInputSchema = z.object({ tokenId: idSchema, code: z.string().min(1, 'Code is required').max(6, 'Maximum of 6 characters') })

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

export const createAccountInputSchema = passwordSchema.and(z.object({ tokenId: idSchema }))
