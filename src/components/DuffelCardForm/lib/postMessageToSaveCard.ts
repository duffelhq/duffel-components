export function postMessageToSaveCard(
  iFrameReference: React.RefObject<HTMLIFrameElement>,
  baseUrl: URL
) {
  if (!iFrameReference.current) {
    throw new Error(
      "Attempted to call `postMessageWithStyles` with empty iFrameReference"
    );
  }

  const iFrame = iFrameReference.current;
  if (!iFrame.contentWindow) {
    throw new Error(
      "Attempted to call `postMessageWithStyles` but the iFrame contentWindow is null"
    );
  }

  iFrame.contentWindow.postMessage({ type: "save-card" }, baseUrl.origin);
}
