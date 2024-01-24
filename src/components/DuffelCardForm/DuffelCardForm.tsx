import * as React from "react";
import { getIFrameEventListener } from "./lib/getIFrameEventListener";
import { getIframeURL } from "./lib/getIframeURL";
import { postMessageToCreateCardForTemporaryUse } from "./lib/postMessageToCreateCardForTemporaryUse";
import { postMessageToSaveCard } from "./lib/postMessageToSaveCard";
import { postMessageWithStyles } from "./lib/postMessageWithStyles";
import { DuffelCardFormProps } from "./lib/types";
import { getNewActionsStack } from "./lib/getNewActionsStack";

export const DuffelCardForm: React.FC<DuffelCardFormProps> = ({
  tokenProxyEnvironment = "production",
  clientKey,
  styles,
  intent,
  actions,
  savedCardData,
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
      "Attempted to render `DuffelCardForm` without an `actions` array. You may set the initial state for actions to `['validate']` or use `actions` returned from the `useDuffelCardFormActions` hook."
    );
  }
  if (intent == "to-use-saved-card" && !savedCardData) {
    throw new Error(
      "Attempted to render `DuffelCardForm`to use a saved card but the `cardId` prop is missing. Make sure you provide the id of the saved card you'd like to use."
    );
  }

  // Component state

  const [previousActionsProp, setPreviousActionsProp] =
    React.useState<DuffelCardFormProps["actions"]>(actions);
  const [iFrameHeight, setIFrameHeight] = React.useState("0px");
  const iFrameReference = React.useRef<HTMLIFrameElement>(null);

  // Sets the iframe src
  const iFrameURL = getIframeURL(
    tokenProxyEnvironment,
    intent,
    clientKey,
    savedCardData
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
    const actionStack = getNewActionsStack(previousActionsProp, actions);

    for (const action of actionStack) {
      switch (action) {
        case "create-card-for-temporary-use":
          postMessageToCreateCardForTemporaryUse(iFrameReference, iFrameURL);
          break;
        case "save-card":
          postMessageToSaveCard(iFrameReference, iFrameURL);
          break;
        case "validate":
          // this happens by default on the iframe, no need to post message
          break;
        default:
          throw new Error(`Attempted to perform an unknown action: ${action}.`);
      }
      setPreviousActionsProp(actions);
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
