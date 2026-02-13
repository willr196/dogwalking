import { Empty } from "@/components/willswalks/Empty";
import { type AdminFormAction, type AdminReview } from "../types";

export function ReviewsSection({
  reviews,
  deleteReviewAction,
}: {
  reviews: AdminReview[];
  deleteReviewAction: AdminFormAction;
}) {
  return (
    <section>
      <h2 className="ww-serif text-[1.4rem] mb-3">Reviews</h2>
      <div className="flex flex-col gap-3">
        {reviews.length === 0 ? (
          <Empty text="No reviews yet" />
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[var(--warm-white)] rounded-2xl p-5 shadow-[var(--shadow)]"
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="font-semibold mb-1">
                    {review.name}
                    {review.dogName && (
                      <span className="text-[var(--muted)] font-normal">
                        {" "}· 🐕 {review.dogName}
                      </span>
                    )}
                  </div>
                  <div className="text-sm mb-1">{"⭐".repeat(review.rating)}</div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {review.text}
                  </p>
                </div>
                <form action={deleteReviewAction}>
                  <input type="hidden" name="id" value={review.id} />
                  <button
                    type="submit"
                    className="text-xs text-[var(--danger)] bg-transparent border-none cursor-pointer hover:underline"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
