"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BookingClient } from "@/app/booking/BookingClient";
import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";

export default function BookingPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/sign-in");
    }
  }, [status, router]);

  return (
    <>
      <NavBar />
      {status === "loading" ? (
        <div className="flex min-h-screen items-center justify-center px-5 pt-28 pb-16">
          <div className="spinner" />
        </div>
      ) : status === "authenticated" ? (
        <BookingClient />
      ) : null}
      <Footer />
    </>
  );
}
