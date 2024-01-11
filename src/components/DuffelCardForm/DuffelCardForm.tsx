import * as React from "react";
import { getTokenFromClientKey } from "./lib/getTokenFromClientKey";
import { DuffelCardFormProps } from "./lib/types";
import { getIFrameEventListener } from "./lib/getIFrameEventListener";

export const DuffelCardForm: React.FC<DuffelCardFormProps> = ({
  clientKey,
  styles,
  tokenProxyEnvironment = "production",

  actions,

  onValidateSuccess,
  onValidateFailure,

  onCreateCardForTemporaryUseSuccess,
  onCreateCardForTemporaryUseFailure,
}) => {
  let baseUrlString = "https://api.duffel.cards/iframe.html";
  if (tokenProxyEnvironment === "staging") {
    baseUrlString = "https://api.staging.duffel.cards/iframe.html";
  } else if (tokenProxyEnvironment === "development") {
    baseUrlString = "https://localhost:8000/iframe.html";
  }

  const baseUrl = new URL(baseUrlString);

  const [iFrameHeight, setIFrameHeight] = React.useState("0px");

  const iFrameReference = React.useRef<HTMLIFrameElement>(null);

  const iFrameSrc = `${baseUrl}?${new URLSearchParams({
    token: getTokenFromClientKey(clientKey),
  }).toString()}`;

  function sendMessageToStoreCardForTemporaryUse() {
    if (!iFrameReference.current) {
      throw new Error(
        "Attempted to call `sendMessageToStoreCardForTemporaryUse` with empty iFrameReference"
      );
    }

    const iFrame = iFrameReference.current;
    if (!iFrame.contentWindow) {
      throw new Error(
        "Attempted to call `sendMessageToStoreCardForTemporaryUse` but the iFrame contentWindow is null"
      );
    }

    iFrame.contentWindow.postMessage(
      { type: "create-card-for-temporary-use" },
      baseUrl.origin
    );
  }

  function postMessageWithStyles() {
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

    iFrame.contentWindow.postMessage(
      { type: "apply-styles", styles },
      baseUrl.origin
    );
  }

  /**
   * useEffect to react to changes on the actions prop.
   */
  React.useEffect(() => {
    if (actions.includes("create-card-for-temporary-use")) {
      sendMessageToStoreCardForTemporaryUse();
    }
  }, [actions]);

  /**
   * Adds an event listener to the window to listen to messages from the iframe.
   */
  React.useEffect(() => {
    const iFrameEventListener = getIFrameEventListener(baseUrl.origin, {
      postMessageWithStyles,
      setIFrameHeight,
      onValidateSuccess,
      onValidateFailure,
      onCreateCardForTemporaryUseSuccess,
      onCreateCardForTemporaryUseFailure,
    });
    window.addEventListener("message", iFrameEventListener);
    return () => window.removeEventListener("message", iFrameEventListener);
  }, []);

  return (
    <iframe
      ref={iFrameReference}
      title="Card Payment Form"
      src={iFrameSrc}
      style={{
        width: "100%",
        border: "none",
        height: iFrameHeight,
      }}
    />
  );
};
