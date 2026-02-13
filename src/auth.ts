import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getWalkerSignInCode, isWalkerApproved } from "@/lib/walker-approval";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

class EmailNotVerifiedError extends CredentialsSignin {
  code = "email_not_verified";
}

class WalkerPendingApprovalError extends CredentialsSignin {
  code = "walker_pending";
}

class WalkerRejectedError extends CredentialsSignin {
  code = "walker_rejected";
}

function isUserRole(value: unknown): value is "USER" | "WALKER" | "ADMIN" {
  return value === "USER" || value === "WALKER" || value === "ADMIN";
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            passwordHash: true,
            emailVerified: true,
            walkerApprovalStatus: true,
          },
        });

        if (!user?.passwordHash) return null;

        const valid = await compare(parsed.data.password, user.passwordHash);
        if (!valid) return null;

        // Enforce email verification
        if (!user.emailVerified) {
          throw new EmailNotVerifiedError();
        }

        if (user.role === "WALKER" && !isWalkerApproved(user.walkerApprovalStatus)) {
          const code = getWalkerSignInCode(user.walkerApprovalStatus);
          if (code === "walker_rejected") {
            throw new WalkerRejectedError();
          }
          throw new WalkerPendingApprovalError();
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = isUserRole(user.role) ? user.role : "USER";
      } else if (!isUserRole(token.role)) {
        token.role = "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (typeof token.id === "string") {
          session.user.id = token.id;
        }
        session.user.role = isUserRole(token.role) ? token.role : "USER";
      }
      return session;
    },
  },
});
