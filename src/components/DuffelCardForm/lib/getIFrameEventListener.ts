import { DuffelCardFormProps } from "./types";

type Inputs = {
  setIFrameHeight: (height: string) => void;
  postMessageWithStyles: () => void;
} & Pick<
  DuffelCardFormProps,
  | "onValidateSuccess"
  | "onValidateFailure"
  | "onCreateCardForTemporaryUseSuccess"
  | "onCreateCardForTemporaryUseFailure"
  | "onSaveCardSuccess"
  | "onSaveCardFailure"
  | "onSecurityPolicyViolation"
>;

export function getIFrameEventListener(
  iFrameURL: URL,
  {
    postMessageWithStyles,
    setIFrameHeight,
    onValidateSuccess,
    onValidateFailure,
    onCreateCardForTemporaryUseSuccess,
    onCreateCardForTemporaryUseFailure,
    onSaveCardSuccess,
    onSaveCardFailure,
    onSecurityPolicyViolation,
  }: Inputs,
) {
  return function iFrameEventListener(event: MessageEvent) {
    if (
      !iFrameURL.origin?.startsWith(event.origin) ||
      !event.data ||
      !event.data.type
    ) {
      return;
    }

    const eventType = event?.data?.type;

    switch (eventType) {
      case "iframe-loaded":
        postMessageWithStyles();
        return;

      case "content-height-ready":
        setIFrameHeight(event.data.height);
        return;

      case "validate-success":
        if (onValidateSuccess) {
          onValidateSuccess();
        } else {
          console.warn("`onValidateSuccess` not implemented");
        }
        return;

      case "validate-failure":
        if (onValidateFailure) {
          onValidateFailure();
        } else {
          console.warn("`onValidateFailure` not implemented");
        }
        return;

      case "create-card-for-temporary-use-success":
        if (onCreateCardForTemporaryUseSuccess) {
          onCreateCardForTemporaryUseSuccess(event.data.data);
        } else {
          console.warn("`onCreateCardForTemporaryUseSuccess` not implemented");
        }
        return;

      case "create-card-for-temporary-use-failure":
        if (onCreateCardForTemporaryUseFailure) {
          onCreateCardForTemporaryUseFailure(event.data.error);
        } else {
          console.warn("`onCreateCardForTemporaryUseFailure` not implemented");
        }
        return;

      case "save-card-success":
        if (onSaveCardSuccess) {
          onSaveCardSuccess(event.data.data);
        } else {
          console.warn("`onSaveCardSuccess` not implemented");
        }
        return;

      case "save-card-failure":
        if (onSaveCardFailure) {
          onSaveCardFailure(event.data.error);
        } else {
          console.warn("`onSaveCardFailure` not implemented");
        }
        return;

      case "security-policy-violation":
        if (onSecurityPolicyViolation) {
          onSecurityPolicyViolation(event.data.data);
        } else {
          console.warn("`onSecurityPolicyViolation` not implemented");
        }
        return;

      case "load":
        return;

      default:
        // eslint-disable-next-line
        console.log(`Unknown event type: ${eventType}`);
        return;
    }
  };
}
