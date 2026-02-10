import { ReviewsClient } from "@/app/reviews/ReviewsClient";
import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";

export default function ReviewsPage() {
  return (
    <>
      <div className="grain-overlay" />
      <NavBar />
      <ReviewsClient />
      <Footer />
    </>
  );
}
