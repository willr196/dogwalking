import { SignInClient } from "./SignInClient";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; verified?: string }>;
}) {
  const params = await searchParams;

  const verified = params.verified === "true";
  const errorParam = params.error;
  const errorMap: Record<string, string> = {
    CredentialsSignin: "Invalid email or password.",
    AccessDenied: "Access denied.",
    Configuration: "Authentication configuration error.",
  };
  const initialError = errorParam ? errorMap[errorParam] ?? errorParam : null;

  return <SignInClient initialError={initialError} verified={verified} />;
}
