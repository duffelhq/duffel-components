export const toUTCDate = <T extends Date | null>(date: T): T => {
  if (!(date instanceof Date)) return null as T;
  const dateStr = date.toISOString().split("T")[0];
  return new Date(`${dateStr}T12:00:00Z`) as T;
};
