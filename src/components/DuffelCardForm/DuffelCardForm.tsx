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

    const intentsToUseSavedCard = intent === "to-use-saved-card";
    const defaultIframeHeight = intentsToUseSavedCard ? "68px" : "838px";

    // Component state
    // 838px is the height of the iframe content without any styles applied.
    // Setting it to this height, prevents a big jump in height once the iframe is loaded.
    const [iFrameHeight, setIFrameHeight] = React.useState(defaultIframeHeight);
    const [isLoading, setIsLoading] = React.useState(true);
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
        postMessageWithStyles: () => {
          postMessageWithStyles(iFrameReference, iFrameURL, styles);
        },
        setIFrameHeight: (height: number) => {
          setIFrameHeight(`${height}px`);
          setIsLoading(false);
        },
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
      <>
        {isLoading && (
          <div
            style={{
              height: iFrameHeight,
              width: "100%",
              fontFamily: "inherit",
              padding: "1rem",
              gap: "8px",
              display: "flex",
              justifyContent: intentsToUseSavedCard ? "flex-start" : "center",
              alignItems: "center",
            }}
          >
            <img
              height="20px"
              src="https://assets.duffel.com/img/spinner.gif"
              alt="spinner"
            />
            <span>Preparing payment...</span>
          </div>
        )}
        <iframe
          ref={iFrameReference}
          title="Card Payment Form"
          src={iFrameURL.href}
          style={{
            width: "100%",
            border: "none",
            height: iFrameHeight,
            visibility: isLoading ? "hidden" : "visible",
            position: isLoading ? "absolute" : "static",
            pointerEvents: isLoading ? "none" : "auto",
          }}
        />
      </>
    );
  },
);
