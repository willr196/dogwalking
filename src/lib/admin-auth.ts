import { auth } from "@/auth";

export async function isAdminAuthenticated() {
  const session = await auth();
  return Boolean(session?.user && session.user.role === "ADMIN");
}
