import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").max(50, "Name is too long"),
  email: z.string().email("Email must be valid"),
});

export const validateForm = (data) => {
  return formSchema.safeParse(data);
};