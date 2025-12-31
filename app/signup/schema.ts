import { z } from "zod";

// Zod schema for client-side validation of the form fields. Arcjet will do
// server-side validation as well because you can't trust the client.
// Client-side validation improves the UX by providing immediate feedback
// whereas server-side validation is necessary for security.
export const formSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
});

export const emptyFormSchema = z.object({});
