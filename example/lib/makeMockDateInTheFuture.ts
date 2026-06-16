export function makeMockDateInTheFuture(daysAhead: number): Date {
  const now = new Date(Date.now());
  now.setDate(now.getDate() + daysAhead);
  return now;
}
