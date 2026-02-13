import { type AdminStat } from "../types";

export function AdminStatsGrid({ stats }: { stats: AdminStat[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3 mb-7">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[var(--warm-white)] rounded-[18px] p-5 shadow-[var(--shadow)] text-center"
        >
          <div className={`ww-serif text-[1.8rem] font-bold ${stat.color}`}>
            {stat.value}
          </div>
          <div className="text-[13px] text-[var(--muted)] mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
