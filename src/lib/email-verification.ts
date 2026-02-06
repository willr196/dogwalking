import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

const VERIFICATION_EXPIRY_HOURS = 24;

/**
 * Generate a verification token and store it in the database.
 * Returns the raw token string to include in the verification URL.
 */
export async function createVerificationToken(email: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + VERIFICATION_EXPIRY_HOURS * 60 * 60 * 1000);

  // Upsert: if there's already a pending token for this email, replace it
  await prisma.verificationToken.upsert({
    where: { identifier_token: { identifier: email, token } },
    create: { identifier: email, token, expires },
    update: { token, expires },
  });

  // Clean up any other expired tokens for this identifier
  await prisma.verificationToken.deleteMany({
    where: { identifier: email, expires: { lt: new Date() } },
  });

  return token;
}

/**
 * Verify a token: check it exists, hasn't expired, then mark the user
 * as verified and delete the token.
 *
 * Returns `{ ok: true, email }` on success, `{ ok: false, error }` on failure.
 */
export async function verifyEmailToken(
  token: string
): Promise<{ ok: true; email: string } | { ok: false; error: string }> {
  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record) {
    return { ok: false, error: "Invalid or expired verification link." };
  }

  if (record.expires < new Date()) {
    // Clean up the expired token
    await prisma.verificationToken.delete({
      where: { token },
    });
    return { ok: false, error: "Verification link has expired. Please register again." };
  }

  // Mark user as verified
  await prisma.user.updateMany({
    where: { email: record.identifier },
    data: { emailVerified: new Date() },
  });

  // Delete the used token
  await prisma.verificationToken.delete({
    where: { token },
  });

  return { ok: true, email: record.identifier };
}

/**
 * Send a verification email.
 *
 * 🔧 PLACEHOLDER: Currently logs the link to console.
 *    Replace with Resend, Nodemailer, or any email provider:
 *
 *    import { Resend } from 'resend';
 *    const resend = new Resend(process.env.RESEND_API_KEY);
 *    await resend.emails.send({ ... });
 */
export async function sendVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || "http://localhost:3000";
  const verifyUrl = `${baseUrl}/api/verify-email?token=${token}`;

  // ──────────────────────────────────────────────
  // 📧 PLACEHOLDER — swap this for a real email sender
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📧 VERIFICATION EMAIL`);
  console.log(`   To: ${email}`);
  console.log(`   Link: ${verifyUrl}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  // ──────────────────────────────────────────────

  return verifyUrl;
}
