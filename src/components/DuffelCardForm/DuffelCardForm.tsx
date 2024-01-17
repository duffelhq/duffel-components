import * as React from "react";
import { getIFrameEventListener } from "./lib/getIFrameEventListener";
import { getIframeURL } from "./lib/getIframeURL";
import { postMessageToSaveCard } from "./lib/postMessageToSaveCard";
import { postMessageToStoreCardForTemporaryUse } from "./lib/postMessageToStoreCardForTemporaryUse";
import { postMessageWithStyles } from "./lib/postMessageWithStyles";
import { DuffelCardFormProps } from "./lib/types";

export const DuffelCardForm: React.FC<DuffelCardFormProps> = ({
  tokenProxyEnvironment = "production",
  clientKey,
  styles,
  intent,
  actions,
  cardId,
  onValidateSuccess,
  onValidateFailure,
  onCreateCardForTemporaryUseSuccess,
  onCreateCardForTemporaryUseFailure,
  onSaveCardSuccess,
  onSaveCardFailure,
}) => {
  // Validates required props
  if (!clientKey) {
    throw new Error(
      "Attempted to render `DuffelCardForm` without a clientKey."
    );
  }
  if (!intent) {
    throw new Error(
      "Attempted to render `DuffelCardForm` without an `intent`. Make sure your provide one of the following: `create-card-for-temporary-use`, `save-card`, `use-saved-card`."
    );
  }
  if (!Array.isArray(actions)) {
    throw new Error(
      "Attempted to render `DuffelCardForm` without an `actions` array. You may set the initial state for actions to `['validate']` or use `action` returned from the `useDuffelCardFormActions` hook."
    );
  }
  if (intent == "to-use-saved-card" && !cardId) {
    throw new Error(
      "Attempted to render `DuffelCardForm`to use a saved card but the `cardId` prop is missing. Make sure you provide the id of the saved card you'd like to use."
    );
  }

  // Calls hooks
  const [iFrameHeight, setIFrameHeight] = React.useState("0px");
  const iFrameReference = React.useRef<HTMLIFrameElement>(null);

  // Sets the iframe src
  const iFrameURL = getIframeURL(
    tokenProxyEnvironment,
    intent,
    clientKey,
    cardId
  );

  // Register event listeners to the window to listen to messages from the iframe.
  React.useEffect(() => {
    const iFrameEventListener = getIFrameEventListener(iFrameURL, {
      postMessageWithStyles: () =>
        postMessageWithStyles(iFrameReference, iFrameURL, styles),
      setIFrameHeight,
      onValidateSuccess,
      onValidateFailure,
      onCreateCardForTemporaryUseSuccess,
      onCreateCardForTemporaryUseFailure,
      onSaveCardSuccess,
      onSaveCardFailure,
    });

    window.addEventListener("message", iFrameEventListener);
    return () => window.removeEventListener("message", iFrameEventListener);
  }, []);

  React.useEffect(() => {
    if (actions.includes("create-card-for-temporary-use")) {
      postMessageToStoreCardForTemporaryUse(iFrameReference, iFrameURL);
    }

    if (actions.includes("save-card")) {
      postMessageToSaveCard(iFrameReference, iFrameURL);
    }
  }, [actions]);

  return (
    <iframe
      ref={iFrameReference}
      title="Card Payment Form"
      src={iFrameURL.href}
      style={{
        width: "100%",
        border: "none",
        height: iFrameHeight,
      }}
    />
  );
};
