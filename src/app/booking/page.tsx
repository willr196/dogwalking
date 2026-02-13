"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BookingClient } from "@/app/booking/BookingClient";

export default function BookingPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/sign-in");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--cream)]">
        <div className="spinner" />
      </div>
    );
  }

  if (status !== "authenticated") return null;

  return <BookingClient />;
}
