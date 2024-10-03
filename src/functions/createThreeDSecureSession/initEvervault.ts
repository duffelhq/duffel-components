const DEFAULT_EVERVAULT_CREDENTIALS = {
  teamID: "team_a22f3ea22207",
  appID: "app_976f15bbdddd",
};

export function initEvervault(
  sessionID: string,
  overrideEvervaultCredentials = DEFAULT_EVERVAULT_CREDENTIALS
) {
  // @ts-expect-error - We don't have Evervault defined as it comes from a CDN and types are not available.
  const evervault = new Evervault(
    overrideEvervaultCredentials.teamID,
    overrideEvervaultCredentials.appID
  );
  const threeDSecure = evervault.ui.threeDSecure(sessionID);
  threeDSecure.mount();
  return threeDSecure;
}
