import { Empty } from "@/components/willswalks/Empty";
import { formatDate } from "@/components/willswalks/utils";
import { type AdminBooking, type AdminFormAction } from "../types";

export function BookingsSection({
  bookings,
  cancelBookingAction,
}: {
  bookings: AdminBooking[];
  cancelBookingAction: AdminFormAction;
}) {
  return (
    <section>
      <h2 className="ww-serif text-[1.4rem] mb-3">Bookings</h2>
      <div className="flex flex-col gap-3">
        {bookings.length === 0 ? (
          <Empty text="No bookings yet" />
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className={`bg-[var(--warm-white)] rounded-2xl p-5 shadow-[var(--shadow)] ${
                booking.status === "cancelled" ? "opacity-50" : ""
              }`}
            >
              <div className="flex justify-between items-start gap-3 flex-wrap">
                <div>
                  <div className="font-semibold mb-1">
                    {booking.dogName}{" "}
                    <span className="font-normal text-[var(--muted)]">
                      ({booking.dogBreed || booking.dogSize})
                    </span>
                  </div>
                  <div className="text-sm text-[var(--muted)]">
                    {booking.ownerName} · {booking.email} · {booking.phone}
                  </div>
                  <div className="text-sm text-[var(--deep-green)] font-medium mt-1.5">
                    {formatDate(booking.date.toISOString().split("T")[0])} at {booking.timeSlot} · £
                    {booking.price || 18}
                  </div>
                  {booking.notes && (
                    <div className="text-[13px] text-[var(--muted)] mt-1.5 italic">
                      &ldquo;{booking.notes}&rdquo;
                    </div>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "confirmed"
                        ? "bg-[rgba(107,158,126,0.12)] text-[var(--green)]"
                        : "bg-[rgba(200,100,100,0.1)] text-[var(--danger)]"
                    }`}
                  >
                    {booking.status}
                  </span>
                  {booking.status === "confirmed" && (
                    <form action={cancelBookingAction}>
                      <input type="hidden" name="id" value={booking.id} />
                      <button
                        type="submit"
                        className="text-xs text-[var(--danger)] bg-transparent border-none cursor-pointer hover:underline"
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
