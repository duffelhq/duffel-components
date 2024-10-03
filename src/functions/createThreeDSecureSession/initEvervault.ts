export function initEvervault(
  sessionID: string,
  teamID: string,
  appID: string,
) {
  // @ts-expect-error - We don't have Evervault defined as it comes from a CDN and types are not available.
  const evervault = new Evervault(teamID, appID);
  const threeDSecure = evervault.ui.threeDSecure(sessionID);
  threeDSecure.mount();
  return threeDSecure;
}
