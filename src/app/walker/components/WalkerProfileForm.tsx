import { type WalkerFormAction, type WalkerProfileFields } from "../types";

export function WalkerProfileForm({
  profile,
  saveWalkerProfileAction,
}: {
  profile: WalkerProfileFields;
  saveWalkerProfileAction: WalkerFormAction;
}) {
  return (
    <form
      action={saveWalkerProfileAction}
      className="rounded-2xl bg-[var(--warm-white)] border border-[var(--green)]/10 p-6 mb-6"
    >
      <h2 className="ww-serif text-[1.5rem] mb-2">Walker Profile</h2>
      <p className="text-sm text-[var(--muted)] mb-5">
        Keep these details updated. They can be used in future public walker
        listings.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text)]">
            Service Area
          </label>
          <input
            type="text"
            name="walkerServiceArea"
            defaultValue={profile.walkerServiceArea ?? ""}
            placeholder="Fulham, SW6 and nearby"
            className="w-full px-4 py-3 rounded-2xl border-2 border-[var(--light)] bg-[var(--cream)] text-[var(--text)] text-sm transition-colors duration-200 focus:border-[var(--green)] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text)]">
            Hourly Rate (£)
          </label>
          <input
            type="number"
            min={5}
            max={250}
            name="walkerRatePerHour"
            defaultValue={profile.walkerRatePerHour ?? ""}
            placeholder="18"
            className="w-full px-4 py-3 rounded-2xl border-2 border-[var(--light)] bg-[var(--cream)] text-[var(--text)] text-sm transition-colors duration-200 focus:border-[var(--green)] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text)]">
            Experience (years)
          </label>
          <input
            type="number"
            min={0}
            max={60}
            name="walkerExperienceYears"
            defaultValue={profile.walkerExperienceYears ?? ""}
            placeholder="3"
            className="w-full px-4 py-3 rounded-2xl border-2 border-[var(--light)] bg-[var(--cream)] text-[var(--text)] text-sm transition-colors duration-200 focus:border-[var(--green)] focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-[var(--text)]">
          Availability
        </label>
        <textarea
          name="walkerAvailability"
          defaultValue={profile.walkerAvailability ?? ""}
          rows={3}
          placeholder="Weekdays 8am-6pm, weekends by arrangement"
          className="w-full px-4 py-3 rounded-2xl border-2 border-[var(--light)] bg-[var(--cream)] text-[var(--text)] text-sm transition-colors duration-200 focus:border-[var(--green)] focus:outline-none resize-y"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-2 text-[var(--text)]">
          Bio
        </label>
        <textarea
          name="walkerBio"
          defaultValue={profile.walkerBio ?? ""}
          rows={5}
          placeholder="Tell owners about your dog handling style and experience."
          className="w-full px-4 py-3 rounded-2xl border-2 border-[var(--light)] bg-[var(--cream)] text-[var(--text)] text-sm transition-colors duration-200 focus:border-[var(--green)] focus:outline-none resize-y"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-[var(--green)] text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity border-none cursor-pointer"
      >
        Save Profile
      </button>
    </form>
  );
}
