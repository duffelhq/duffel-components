import * as React from "react";
import { getIFrameEventListener } from "./lib/getIFrameEventListener";
import { getIframeURL } from "./lib/getIframeURL";
import { postMessageToCreateCardForTemporaryUse } from "./lib/postMessageToCreateCardForTemporaryUse";
import { postMessageToSaveCard } from "./lib/postMessageToSaveCard";
import { postMessageWithStyles } from "./lib/postMessageWithStyles";
import { DuffelCardFormProps } from "./lib/types";
import { DuffelCardFormActions } from "./lib/useDuffelCardFormActions";

export const DuffelCardForm = React.forwardRef<
  DuffelCardFormActions,
  DuffelCardFormProps
>(
  (
    {
      tokenProxyEnvironment = "production",
      clientKey,
      styles,
      intent,
      savedCardData,
      onValidateSuccess,
      onValidateFailure,
      onCreateCardForTemporaryUseSuccess,
      onCreateCardForTemporaryUseFailure,
      onSaveCardSuccess,
      onSaveCardFailure,
      onSecurityPolicyViolation,
    },
    ref,
  ) => {
    // Validates required props
    if (!clientKey) {
      throw new Error(
        "Attempted to render `DuffelCardForm` without a clientKey.",
      );
    }
    if (!intent) {
      throw new Error(
        "Attempted to render `DuffelCardForm` without an `intent`. Make sure your provide one of the following: `create-card-for-temporary-use`, `save-card`, `use-saved-card`.",
      );
    }
    if (intent == "to-use-saved-card" && !savedCardData) {
      throw new Error(
        "Attempted to render `DuffelCardForm`to use a saved card but the `cardId` prop is missing. Make sure you provide the id of the saved card you'd like to use.",
      );
    }

    // Post message with ref functions
    React.useImperativeHandle(
      ref,
      () => {
        return {
          saveCard: () => postMessageToSaveCard(iFrameReference, iFrameURL),
          createCardForTemporaryUse: () =>
            postMessageToCreateCardForTemporaryUse(iFrameReference, iFrameURL),
        };
      },
      [],
    );

    // Component state
    const [iFrameHeight, setIFrameHeight] = React.useState("0px");
    const iFrameReference = React.useRef<HTMLIFrameElement>(null);

    // Sets the iframe src
    const iFrameURL = getIframeURL(
      tokenProxyEnvironment,
      intent,
      clientKey,
      savedCardData,
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
        onSecurityPolicyViolation,
      });

      window.addEventListener("message", iFrameEventListener);
      return () => window.removeEventListener("message", iFrameEventListener);
    }, []);

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
  },
);
