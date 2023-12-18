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
>;

export function getIFrameEventListener(
  baseUrl: string,
  {
    postMessageWithStyles,
    setIFrameHeight,
    onValidateSuccess,
    onValidateFailure,
    onCreateCardForTemporaryUseSuccess,
    onCreateCardForTemporaryUseFailure,
  }: Inputs
) {
  return function iFrameEventListener(event: MessageEvent) {
    if (!baseUrl?.startsWith(event.origin) || !event.data || !event.data.type) {
      return;
    }

    const eventType = event?.data?.type;

    switch (eventType) {
      case "iframe-loaded":
        if (postMessageWithStyles) postMessageWithStyles();
        return;

      case "content-height-set":
        setIFrameHeight(event.data.height);
        return;

      case "validate-success":
        onValidateSuccess();
        return;

      case "validate-failure":
        onValidateFailure();
        return;

      case "create-card-for-temporary-use-success":
        onCreateCardForTemporaryUseSuccess(event.data.data);
        return;

      case "create-card-for-temporary-use-failure":
        onCreateCardForTemporaryUseFailure(event.data.error);
        return;

      default:
        // eslint-disable-next-line
        console.log(`Unknown event type: ${eventType}`);
        return;
    }
  };
}
