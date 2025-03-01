import { z } from 'zod';

export const formSchema = z.object({
	email: z.string().email().min(3),
	password: z.string().min(7)
});

export type FormSchema = typeof formSchema;
