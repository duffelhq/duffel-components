import { DuffelCardFormStyles } from "./types";

export function postMessageWithStyles(
  iFrameReference: React.RefObject<HTMLIFrameElement>,
  baseUrl: URL,
  styles: DuffelCardFormStyles | undefined,
) {
  if (!iFrameReference.current) {
    throw new Error(
      "Attempted to call `postMessageWithStyles` with empty iFrameReference",
    );
  }

  const iFrame = iFrameReference.current;
  if (!iFrame.contentWindow) {
    throw new Error(
      "Attempted to call `postMessageWithStyles` but the iFrame contentWindow is null",
    );
  }

  iFrame.contentWindow.postMessage(
    { type: "apply-styles", styles },
    baseUrl.origin,
  );
}
