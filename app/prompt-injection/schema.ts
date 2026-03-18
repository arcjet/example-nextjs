import { z } from "zod";

// Zod schema for client-side validation of the form fields. Arcjet will do
// server-side validation as well because you can't trust the client.
// Client-side validation improves the UX by providing immediate feedback
// whereas server-side validation is necessary for security.
export const formSchema = z.object({
  userPrompt: z
    .string()
    .min(5, { message: "Your prompt must be at least 5 characters." })
    .max(2000, {
      message:
        "Your prompt is too long. Please shorten it to 2000 characters.",
    }),
});
