export function postMessageToCreateCardForTemporaryUse(
  iFrameReference: React.RefObject<HTMLIFrameElement>,
  baseUrl: URL,
) {
  if (!iFrameReference.current) {
    throw new Error(
      "Attempted to call `postMessageToStoreCardForTemporaryUse` with empty iFrameReference",
    );
  }

  const iFrame = iFrameReference.current;
  if (!iFrame.contentWindow) {
    throw new Error(
      "Attempted to call `postMessageToStoreCardForTemporaryUse` but the iFrame contentWindow is null",
    );
  }

  iFrame.contentWindow.postMessage(
    { type: "create-card-for-temporary-use" },
    baseUrl.origin,
  );
}
