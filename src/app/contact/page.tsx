import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";
import { ContactClient } from "@/app/contact/ContactClient";

export default function ContactPage() {
  return (
    <>
      <div className="grain-overlay" />
      <NavBar />
      <ContactClient />
      <Footer />
    </>
  );
}

