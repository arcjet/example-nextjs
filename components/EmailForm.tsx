"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/signup/schema";

export function EmailForm() {
  // Allows us to set an error message on the form.
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "nonexistent@arcjet.ai",
    },
  });

  // Used to navigate to the welcome page after a successful form submission.
  const router = useRouter();

  // Define a submit handler called when the form is submitted. It sends the
  // form data to an API endpoint and redirects to the welcome page on success.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    clearErrors();

    // values is guaranteed to be of the correct type by the Zod schema.
    const result = await fetch("/signup/test", {
      body: JSON.stringify(values),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful and redirect to the welcome page if
    // so. Otherwise, set a root error message.
    if (result.ok) {
      router.push("/signup/submitted");
    } else {
      const statusText = result?.statusText || "Service error";
      const error = await result.json();
      const errorMessage = error?.message || statusText;

      setError("root.serverError", {
        message: `We couldn't sign you up: ${errorMessage}`,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-field">
        <label className="form-label">
          Email
          <input
            {...register("email", {
              onChange: () => clearErrors(),
            })}
            type="email"
            placeholder="totoro@example.com"
            className="form-input"
          />
        </label>
        <span className="form-description">
          Just a test form - you won&apos;t receive any emails.
        </span>
        {errors.email && (
          <span className="form-error">{errors.email.message}</span>
        )}
        {errors.root?.serverError && (
          <span className="form-error">{errors.root.serverError.message}</span>
        )}
      </div>
      <div className="form-button">
        <button
          type="submit"
          className="button-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>
      </div>
    </form>
  );
}
