import * as React from "react";
import { getTokenFromClientKey } from "./lib/getTokenFromClientKey";
import { DuffelCardFormProps } from "./lib/types";
import { getIFrameEventListener } from "./lib/getIFrameEventListener";

const LOCAL_TOKEN_PROXY_IFRAME_BASE_URL = "https://localhost:8000/iframe.html";

export const DuffelCardForm: React.FC<DuffelCardFormProps> = ({
  clientKey,
  styles,
  shouldUseLocalTokenProxy,

  actions,

  onValidateSuccess,
  onValidateFailure,

  onCreateCardForTemporaryUseSuccess,
  onCreateCardForTemporaryUseFailure,
}) => {
  const baseUrlString = shouldUseLocalTokenProxy
    ? LOCAL_TOKEN_PROXY_IFRAME_BASE_URL
    : process.env.TOKEN_PROXY_IFRAME_BASE_URL;

  if (typeof baseUrlString !== "string") {
    throw new Error("TOKEN_PROXY_IFRAME_BASE_URL is not defined");
  }

  const baseUrl = new URL(baseUrlString);

  const [iFrameHeight, setIFrameHeight] = React.useState("0px");

  const iFrameReference = React.useRef<HTMLIFrameElement>(null);

  const params: Record<string, string> = {
    token: getTokenFromClientKey(clientKey),
    ...(styles?.fontFamily && { font: styles?.fontFamily }),
    ...(styles?.stylesheetUrl && { stylesheet: styles?.stylesheetUrl }),
  };

  const iFrameSrc = `${baseUrl}?${new URLSearchParams(params).toString()}`;

  /**
   * Adds an event listener to the window to listen to messages from the iframe.
   */
  React.useEffect(() => {
    const iFrameEventListener = getIFrameEventListener(baseUrl.origin, {
      setIFrameHeight,
      onValidateSuccess,
      onValidateFailure,
      onCreateCardForTemporaryUseSuccess,
      onCreateCardForTemporaryUseFailure,
    });
    window.addEventListener("message", iFrameEventListener);
    return () => window.removeEventListener("message", iFrameEventListener);
  }, []);

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

  /**
   * useEffect to react to changes on the actions prop.
   */
  React.useEffect(() => {
    if (actions.includes("create-card-for-temporary-use")) {
      sendMessageToStoreCardForTemporaryUse();
    }
  }, [actions]);

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
