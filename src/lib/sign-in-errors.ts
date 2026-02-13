export function getSignInErrorMessage(
  error?: string | null,
  code?: string | null
): string | null {
  if (!error) return null;

  if (error === "CredentialsSignin") {
    switch (code) {
      case "email_not_verified":
        return "Please verify your email before signing in.";
      case "walker_pending":
        return "Walker account created. Approval is still pending.";
      case "walker_rejected":
        return "Walker account was rejected. Contact the admin to review it.";
      default:
        return "Invalid email or password.";
    }
  }

  if (error === "missing-token") {
    return "Verification link is missing or invalid.";
  }

  if (error.toLowerCase().includes("verification")) {
    return error;
  }

  return "Sign-in failed. Please try again.";
}
