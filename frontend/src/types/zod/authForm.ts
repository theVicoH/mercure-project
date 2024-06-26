import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z
      .string()
      .min(1, { message: 'You did not provide a password' })
      .min(8, { message: 'Password must be at least 8 characters long' })
      .refine(value => /[a-z]/.test(value), {
        message: 'Password must contain at least one lowercase letter',
      })
      .refine(value => /[A-Z]/.test(value), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine(value => /\d/.test(value), {
        message: 'Password must contain at least one number',
      })
      .refine(value => /[\W_]/.test(value), {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string().min(1, { message: 'Required' }),
    photo: z.any().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'No username given' }),
  password: z.string().min(1, { message: 'No password given' }),
});
