import Link from "next/link";
import { theme } from "@/components/willswalks/theme";

export function Footer() {
  return (
    <footer style={{ background: theme.text, color: "white", padding: "36px 20px", textAlign: "center" }}>
      <p style={{ opacity: 0.6, fontSize: 14 }}>© 2026 Will's Walks · Dog Walking in Fulham, London</p>
      <p style={{ opacity: 0.6, fontSize: 14, marginTop: 6 }}>
        <Link href="mailto:hello@willswalks.co.uk" style={{ color: theme.green, textDecoration: "none" }}>
          hello@willswalks.co.uk
        </Link>
      </p>
    </footer>
  );
}
