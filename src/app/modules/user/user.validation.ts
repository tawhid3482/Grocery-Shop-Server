import { z } from 'zod'

const userValidationSchema = z.object({
  body: z.object({
    id: z.string().min(1, 'ID is required').optional(),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    needsPasswordChange: z.boolean().default(false),
    passwordChangeAt: z.date().optional(),
    gender: z.enum(['male', 'female', 'other'], {
      errorMap: () => ({ message: 'Invalid gender value' }),
    }),
    photo: z.string().min(1, 'Photo URL is required'),
    role: z
      .enum(['admin', 'user'], {
        errorMap: () => ({ message: 'Invalid role value' }),
      })
      .default('user'),
    lastSignInTime: z.string().optional(),
    status: z.enum(['in-progress', 'blocked']).default('in-progress'),
    isDeleted: z.boolean().default(false),
  }),
})


export const userValidation = {
  userValidationSchema
}