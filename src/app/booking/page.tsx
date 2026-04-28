import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { BookingClient } from "@/app/booking/BookingClient";
import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";

export const dynamic = "force-dynamic";

export default async function BookingPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <>
      <NavBar />
      <BookingClient />
      <Footer />
    </>
  );
}
