import {z} from 'zod';

// schema for validating signup data from client ( BE has its own validation)

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
