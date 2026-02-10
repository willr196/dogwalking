import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";
import { BookingClient } from "@/app/booking/BookingClient";

export default function BookingPage() {
  return (
    <>
      <div className="grain-overlay" />
      <NavBar />
      <BookingClient />
      <Footer />
    </>
  );
}

