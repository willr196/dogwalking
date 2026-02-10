/**
 * Send a notification email when a new booking is created.
 *
 * This helper logs the message to the console by default. Replace
 * the console.log calls with a real email integration (e.g. Resend,
 * SendGrid, Nodemailer) to send actual emails. The recipient
 * address defaults to `willrobb11@gmail.com`, but you can set
 * `BOOKING_NOTIFICATION_EMAIL` in your environment to override it.
 */
export async function sendBookingNotificationEmail(booking: {
  ownerName: string;
  email: string;
  phone: string;
  dogName: string;
  dogBreed: string | null;
  dogSize: string;
  date: Date;
  timeSlot: string;
  notes: string | null;
}) {
  const notificationAddress =
    process.env.BOOKING_NOTIFICATION_EMAIL || "willrobb11@gmail.com";
  const subject = `New booking for ${booking.dogName} on ${booking.date
    .toISOString()
    .slice(0, 10)} at ${booking.timeSlot}`;
  const body = `A new dog walk has been booked!\n\n` +
    `Owner: ${booking.ownerName}\n` +
    `Email: ${booking.email}\n` +
    `Phone: ${booking.phone}\n` +
    `Dog: ${booking.dogName}${booking.dogBreed ? ` (${booking.dogBreed})` : ""}\n` +
    `Size: ${booking.dogSize}\n` +
    `Date: ${booking.date.toISOString().slice(0, 10)}\n` +
    `Time: ${booking.timeSlot}\n` +
    (booking.notes ? `Notes: ${booking.notes}\n` : "");

  // ───────────────────────────────────────────────────────────────
  // 📧 PLACEHOLDER
  // To send real emails, import your chosen provider and send
  // { to: notificationAddress, subject, text: body } here.
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📧 BOOKING NOTIFICATION EMAIL`);
  console.log(`   To: ${notificationAddress}`);
  console.log(`   Subject: ${subject}`);
  console.log(`   Body:\n${body}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  return { subject, body, to: notificationAddress };
}