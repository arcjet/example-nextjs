"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { emptyFormSchema } from "@/app/signup/schema";

export function RLForm() {
  // Use state to persist latest error message even across form submissions.
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Set up the form with the Zod schema and a resolver.
  const form = useForm<z.infer<typeof emptyFormSchema>>({
    resolver: zodResolver(emptyFormSchema),
  });

  // Define a submit handler called when the form is submitted. It sends the
  // form data to an API endpoint and redirects to the welcome page on success.
  async function onSubmit(values: z.infer<typeof emptyFormSchema>) {
    // values is guaranteed to be of the correct type by the Zod schema.
    const result = await fetch("/rate-limiting/test", {
      body: JSON.stringify(values),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful and redirect to the welcome page if
    // so. Otherwise, set the error message.
    const statusText = result?.statusText || "Service error";
    const error = await result.json();
    setErrorMessage(error?.message || error.error || statusText);
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
        <button type="submit" className="button-primary form-button">
          Push me
        </button>
      </form>
      {errorMessage && <code>{errorMessage}</code>}
    </>
  );
}
