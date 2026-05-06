import {z} from 'zod';

export const signupSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

export const googleAuthSchema = z.object({
  credential: z.string(),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type GoogleAuthSchema = z.infer<typeof googleAuthSchema>;
