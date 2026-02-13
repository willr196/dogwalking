import { WalkerApprovalStatus } from "@prisma/client";

export type WalkerStatusFilter = "all" | "pending" | "approved" | "rejected";

export type WalkerFilterItem = {
  id: WalkerStatusFilter;
  href: string;
  label: string;
  activeClass: string;
};

export function parseWalkerStatusFilter(
  value: string | string[] | undefined
): WalkerStatusFilter {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "pending" || raw === "approved" || raw === "rejected") {
    return raw;
  }
  return "all";
}

export function getWalkerStatusBadgeClass(status: WalkerApprovalStatus): string {
  if (status === WalkerApprovalStatus.APPROVED) {
    return "bg-[rgba(107,158,126,0.12)] text-[var(--green)]";
  }
  if (status === WalkerApprovalStatus.REJECTED) {
    return "bg-[rgba(217,83,79,0.12)] text-[var(--danger)]";
  }
  return "bg-[rgba(206,138,73,0.14)] text-[var(--brown)]";
}

export function getWalkerStatusLabel(status: WalkerApprovalStatus): string {
  return status.toLowerCase().replace("_", " ");
}

export function getWalkerFilterClass(
  isActive: boolean,
  activeClass: string
): string {
  if (isActive) {
    return `px-3 py-1.5 rounded-full text-xs font-semibold no-underline transition-colors ${activeClass}`;
  }
  return "px-3 py-1.5 rounded-full text-xs font-semibold no-underline transition-colors bg-white text-[var(--muted)] border border-[var(--green)]/20 hover:border-[var(--green)]/45";
}

export function buildWalkerFilterItems(counts: {
  all: number;
  pending: number;
  approved: number;
  rejected: number;
}): WalkerFilterItem[] {
  return [
    {
      id: "all",
      href: "/admin",
      label: `All (${counts.all})`,
      activeClass: "bg-[var(--deep-green)] text-white",
    },
    {
      id: "pending",
      href: "/admin?walkerStatus=pending",
      label: `Pending (${counts.pending})`,
      activeClass: "bg-[var(--brown)] text-white",
    },
    {
      id: "approved",
      href: "/admin?walkerStatus=approved",
      label: `Approved (${counts.approved})`,
      activeClass: "bg-[var(--green)] text-white",
    },
    {
      id: "rejected",
      href: "/admin?walkerStatus=rejected",
      label: `Rejected (${counts.rejected})`,
      activeClass: "bg-[var(--danger)] text-white",
    },
  ];
}
