import { z } from "zod";

// Zod schema for client-side validation of the form fields. Arcjet will do
// server-side validation as well because you can't trust the client.
// Client-side validation improves the UX by providing immediate feedback
// whereas server-side validation is necessary for security.
export const formSchema = z.object({
  supportMessage: z
    .string()
    .min(5, { message: "Your message must be at least 5 characters." })
    .max(1000, {
      message:
        "Your message is too long. Please shorten it to 1000 characters.",
    }),
});
