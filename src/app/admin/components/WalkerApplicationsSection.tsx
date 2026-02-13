import Link from "next/link";
import { WalkerApprovalStatus } from "@prisma/client";
import { Empty } from "@/components/willswalks/Empty";
import {
  getWalkerFilterClass,
  getWalkerStatusBadgeClass,
  getWalkerStatusLabel,
  type WalkerFilterItem,
  type WalkerStatusFilter,
} from "../lib";
import { type AdminFormAction, type AdminWalker } from "../types";

export function WalkerApplicationsSection({
  walkers,
  filteredWalkers,
  walkerStatusFilter,
  walkerFilterItems,
  updateWalkerApprovalStatusAction,
}: {
  walkers: AdminWalker[];
  filteredWalkers: AdminWalker[];
  walkerStatusFilter: WalkerStatusFilter;
  walkerFilterItems: WalkerFilterItem[];
  updateWalkerApprovalStatusAction: AdminFormAction;
}) {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <h2 className="ww-serif text-[1.4rem]">Walker Applications</h2>
        <div className="flex flex-wrap gap-2">
          {walkerFilterItems.map((filterItem) => (
            <Link
              key={filterItem.id}
              href={filterItem.href}
              className={getWalkerFilterClass(
                walkerStatusFilter === filterItem.id,
                filterItem.activeClass
              )}
            >
              {filterItem.label}
            </Link>
          ))}
        </div>
      </div>
      {walkerStatusFilter !== "all" && (
        <p className="text-xs text-[var(--muted)] mb-3">
          Showing {filteredWalkers.length} of {walkers.length} walker accounts.
        </p>
      )}
      <div className="flex flex-col gap-3">
        {filteredWalkers.length === 0 ? (
          <Empty
            text={
              walkerStatusFilter === "all"
                ? "No walker accounts yet"
                : "No walker accounts in this filter"
            }
          />
        ) : (
          filteredWalkers.map((walker) => (
            <div
              key={walker.id}
              className="bg-[var(--warm-white)] rounded-2xl p-5 shadow-[var(--shadow)]"
            >
              <div className="flex justify-between items-start gap-3 flex-wrap">
                <div>
                  <div className="font-semibold mb-1">
                    {walker.name || "Unnamed walker"}
                  </div>
                  <div className="text-sm text-[var(--muted)]">{walker.email}</div>
                  <div className="text-xs text-[var(--muted)] mt-1.5">
                    Joined{" "}
                    {walker.createdAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {walker.emailVerified ? "Email verified" : "Email unverified"}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getWalkerStatusBadgeClass(
                      walker.walkerApprovalStatus
                    )}`}
                  >
                    {getWalkerStatusLabel(walker.walkerApprovalStatus)}
                  </span>

                  <div className="flex gap-2">
                    {walker.walkerApprovalStatus !== WalkerApprovalStatus.APPROVED && (
                      <form action={updateWalkerApprovalStatusAction}>
                        <input type="hidden" name="id" value={walker.id} />
                        <input
                          type="hidden"
                          name="status"
                          value={WalkerApprovalStatus.APPROVED}
                        />
                        <button
                          type="submit"
                          className="text-xs font-semibold text-[var(--green)] bg-[rgba(107,158,126,0.12)] px-3 py-1.5 rounded-full border-none cursor-pointer hover:opacity-90"
                        >
                          Approve
                        </button>
                      </form>
                    )}

                    {walker.walkerApprovalStatus !== WalkerApprovalStatus.REJECTED && (
                      <form action={updateWalkerApprovalStatusAction}>
                        <input type="hidden" name="id" value={walker.id} />
                        <input
                          type="hidden"
                          name="status"
                          value={WalkerApprovalStatus.REJECTED}
                        />
                        <button
                          type="submit"
                          className="text-xs font-semibold text-[var(--danger)] bg-[rgba(217,83,79,0.12)] px-3 py-1.5 rounded-full border-none cursor-pointer hover:opacity-90"
                        >
                          Reject
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
