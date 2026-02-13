-- Performance indexes for Will's Walks
-- Run with: npx prisma migrate dev --name add_performance_indexes

-- Booking queries: filter by status + date (admin dashboard, slot availability)
CREATE INDEX IF NOT EXISTS "Booking_status_date_idx" ON "Booking"("status", "date");

-- Booking queries: filter by date for availability checks
CREATE INDEX IF NOT EXISTS "Booking_date_idx" ON "Booking"("date");

-- Review queries: ordered by creation date (reviews page)
CREATE INDEX IF NOT EXISTS "Review_createdAt_idx" ON "Review"("createdAt" DESC);

-- Message queries: ordered by creation date (admin inbox)
CREATE INDEX IF NOT EXISTS "Message_createdAt_idx" ON "Message"("createdAt" DESC);

-- Message queries: unread messages count
CREATE INDEX IF NOT EXISTS "Message_read_idx" ON "Message"("read");
