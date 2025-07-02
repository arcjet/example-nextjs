"use client";

import { formSchema } from "@/app/sensitive-info/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SupportForm() {
  // Used to navigate to the welcome page after a successful form submission.
  const router = useRouter();

  // Set up the form with the Zod schema and a resolver.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supportMessage:
        "I ordered a hat from your store and would like to request a refund. My credit card number is 4111111111111111 ",
    },
  });

  // Define a submit handler called when the form is submitted. It sends the
  // form data to an API endpoint and redirects to the welcome page on success.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // values is guaranteed to be of the correct type by the Zod schema.
    const result = await fetch("/sensitive-info/test", {
      body: JSON.stringify(values),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful and redirect to the welcome page if
    // so. Otherwise, set a root error message.
    if (result.ok) {
      router.push("/sensitive-info/submitted");
    } else {
      const statusText = result?.statusText || "Service error";
      const error = await result.json();
      const errorMessage = error?.message || statusText;

      form.setError("root.serverError", {
        message: `We couldn't submit the form: ${errorMessage}`,
      });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="form">
      <div className="form-field">
        <label className="form-label">
          Message
          <textarea
            placeholder="Please enter your message."
            className="form-textarea"
            {...form.register("supportMessage")}
          />
        </label>
        {form.formState.errors.supportMessage && (
          <div className="form-error">
            {form.formState.errors.supportMessage.message}
          </div>
        )}
        {form.formState.errors.root?.serverError && (
          <div className="form-error">
            {form.formState.errors.root.serverError.message}
          </div>
        )}
      </div>
      <button type="submit" className="button-primary form-button">
        Submit
      </button>
    </form>
  );
}
