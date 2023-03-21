export const makeMockDateInTheFuture = (daysAhead: number): Date => {
  const now = new Date(Date.now())
  now.setDate(now.getDate() + daysAhead)
  return now
}

export const makeMockDateInThePast = (daysBehind: number): Date => {
  const now = new Date(Date.now())
  now.setDate(now.getDate() - daysBehind)
  return now
}
