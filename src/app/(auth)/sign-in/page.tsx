import { SignInClient } from "./SignInClient";
import { getSignInErrorMessage } from "@/lib/sign-in-errors";

type SearchParams = {
  error?: string | string[];
  code?: string | string[];
  verified?: string | string[];
  registered?: string | string[];
  accountType?: string | string[];
};

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const resolved = searchParams ? await searchParams : undefined;
  const error = firstParam(resolved?.error);
  const code = firstParam(resolved?.code);
  const verified = firstParam(resolved?.verified) === "true";
  const registered = firstParam(resolved?.registered) === "true";
  const accountTypeParam = firstParam(resolved?.accountType);
  const registeredAccountType = registered
    ? accountTypeParam === "walker"
      ? "walker"
      : "owner"
    : undefined;

  return (
    <SignInClient
      initialError={getSignInErrorMessage(error, code)}
      verified={verified}
      registered={registered}
      registeredAccountType={registeredAccountType}
    />
  );
}
