import { signIn } from "@/lib/auth";

export function SignIn() {
  let needToConfigureGitHub: boolean;
  if (process.env.AUTH_GITHUB_ID === undefined) {
    needToConfigureGitHub = true;
  } else {
    needToConfigureGitHub = false;
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button
        type="submit"
        disabled={needToConfigureGitHub}
        className="button-secondary"
      >
        {needToConfigureGitHub
          ? "Configure your GitHub OAuth app credentials in .env to sign in"
          : "Sign in with GitHub to see a different rate limit"}
      </button>
    </form>
  );
}
