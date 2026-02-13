import { WalkerApprovalStatus } from "@prisma/client";

export type WalkerSignInCode = "walker_pending" | "walker_rejected";

export function isWalkerApproved(status: WalkerApprovalStatus): boolean {
  return status === WalkerApprovalStatus.APPROVED;
}

export function getWalkerSignInCode(
  status: WalkerApprovalStatus
): WalkerSignInCode {
  return status === WalkerApprovalStatus.REJECTED
    ? "walker_rejected"
    : "walker_pending";
}
