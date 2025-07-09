import { signIn } from "@/lib/auth";

export function SignIn() {
  if (process.env.AUTH_GITHUB_ID === undefined) {
    return (
      <p>
        Configure your GitHub OAuth app credentials in <code>.env</code> to
        enable sign in.
      </p>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
      className="form"
    >
      <p>Want to try a different rate limit?</p>
      <button type="submit" className="button-secondary">
        Sign in with GitHub
      </button>
    </form>
  );
}
