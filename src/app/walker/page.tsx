import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site.config";
import { getWalkerSignInCode, isWalkerApproved } from "@/lib/walker-approval";
import { saveWalkerProfileAction } from "./actions";
import { WalkerAccountSummary } from "./components/WalkerAccountSummary";
import { WalkerDashboardLinks } from "./components/WalkerDashboardLinks";
import { WalkerProfileForm } from "./components/WalkerProfileForm";
import { walkerDashboardUserSelect } from "./types";

export const metadata: Metadata = {
  title: `Walker Dashboard | ${siteConfig.brandName}`,
  description: "Walker account area for schedule, clients, and service updates.",
  alternates: { canonical: `${siteConfig.siteUrl}/walker` },
};

export const dynamic = "force-dynamic";

function parseSavedState(value: string | string[] | undefined): boolean {
  const savedParam = Array.isArray(value) ? value[0] : value;
  return savedParam === "true";
}

export default async function WalkerPage({
  searchParams,
}: {
  searchParams?: Promise<{ saved?: string | string[] }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const showSavedState = parseSavedState(resolvedSearchParams.saved);

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: walkerDashboardUserSelect,
  });

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== "WALKER" && user.role !== "ADMIN") {
    redirect("/");
  }

  if (user.role === "WALKER" && !isWalkerApproved(user.walkerApprovalStatus)) {
    const code = getWalkerSignInCode(user.walkerApprovalStatus);
    redirect(`/sign-in?error=CredentialsSignin&code=${code}`);
  }

  return (
    <PageLayout>
      <Section>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Walker Dashboard" }]}
        />

        <h1 className="ww-serif text-[clamp(2rem,4vw,2.8rem)] leading-tight mb-4">
          Walker Dashboard
        </h1>
        <p className="text-[var(--muted)] text-lg leading-relaxed max-w-[760px] mb-8">
          Your walker account is active. Update your profile details below so
          your walker profile can be used across booking and admin views.
        </p>

        {showSavedState && (
          <div className="bg-[rgba(107,158,126,0.12)] text-[var(--deep-green)] px-5 py-3 rounded-2xl text-sm font-medium mb-6">
            Walker profile saved.
          </div>
        )}

        <WalkerAccountSummary name={user.name} email={user.email} />

        {user.role === "WALKER" && (
          <WalkerProfileForm
            profile={{
              walkerBio: user.walkerBio,
              walkerServiceArea: user.walkerServiceArea,
              walkerRatePerHour: user.walkerRatePerHour,
              walkerAvailability: user.walkerAvailability,
              walkerExperienceYears: user.walkerExperienceYears,
            }}
            saveWalkerProfileAction={saveWalkerProfileAction}
          />
        )}

        <WalkerDashboardLinks isAdmin={user.role === "ADMIN"} />
      </Section>
    </PageLayout>
  );
}
