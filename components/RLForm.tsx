"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { emptyFormSchema } from "@/app/signup/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./RLForm.module.css";

export function RLForm() {
  // Allows us to set an error message on the form.
  const {
    setError,
    formState: { errors },
  } = useForm();
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
    // so. Otherwise, set a root error message.
    const statusText = result?.statusText || "Service error";
    const error = await result.json();
    const errorMessage = error?.message || error.error || statusText;

    setError("root.serverError", {
      message: `${errorMessage}`,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.formContainer}
      >
        <Button type="submit">Push me</Button>
        {errors.root?.serverError && (
          <pre>{errors.root.serverError.message}</pre>
        )}
      </form>
    </Form>
  );
}
