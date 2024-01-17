import React from "react";
import { DuffelCardFormProps } from "./types";

/**
 * This hook gives you convinient helpers to read and reason through the DuffelCardForm integration.
 * Add `actions` to the `DuffelCardForm` actiosn prop and call the functions to trigger the actions you'd like.
 *
 * In the background, this hook is setting the state on actions prop and the component's useEffect hook will trigger the action.
 */

export function useDuffelCardFormActions() {
  const [cardFormActions, setCardFormActions] = React.useState<
    DuffelCardFormProps["actions"]
  >(["validate"]);

  function triggerSaveCard() {
    setCardFormActions([...cardFormActions, "save-card"]);
  }

  function triggerCreateCardForTemporaryUse() {
    setCardFormActions([...cardFormActions, "create-card-for-temporary-use"]);
  }

  return {
    actions: cardFormActions,
    triggerSaveCard,
    triggerCreateCardForTemporaryUse,
  };
}
