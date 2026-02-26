import type { Metadata } from "next";
import { ReviewsClient } from "./ReviewsClient";
import { PageLayout } from "@/components/willswalks/PageLayout";

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
    <PageLayout>
      <ReviewsClient />
    </PageLayout>
  );
}
