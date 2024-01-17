import React from "react";
import { DuffelCardFormProps } from "./types";

export interface UseDuffelCardFormActionsHook {
  /**
   *  The actions array that should be passed to the `actions` prop of the `DuffelCardForm` component.
   */
  actions: DuffelCardFormProps["actions"];

  /**
   *  Call this function to tell the component to save the card.
   */
  triggerSaveCard: () => void;

  /**
   *  Call this function to tell the component to create a card for temporary use.
   */
  triggerCreateCardForTemporaryUse: () => void;
}

/**
 * This hook gives you convinient helpers to read and reason through the DuffelCardForm integration.
 * Add `actions` to the `DuffelCardForm` actiosn prop and call the functions to trigger the actions you'd like.
 *
 * In the background, this hook is setting the state on actions prop and the component's useEffect hook will trigger the action.
 */
export function useDuffelCardFormActions(): UseDuffelCardFormActionsHook {
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
