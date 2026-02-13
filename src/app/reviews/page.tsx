import type { Metadata } from "next";
import { ReviewsClient } from "./ReviewsClient";
import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Read what dog owners in Fulham say about Will's Walks. Real reviews from happy customers.",
  openGraph: {
    title: "Reviews | Will's Walks",
    description: "Read what dog owners in Fulham say about Will's Walks.",
  },
};

export default function ReviewsPage() {
  return (
    <>
      <NavBar />
      <ReviewsClient />
      <Footer />
    </>
  );
}
