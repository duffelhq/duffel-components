import React from "react";

export interface DuffelCardFormActions {
  saveCard: () => void;
  createCardForTemporaryUse: () => void;
}

export interface UseDuffelCardFormActionsHook {
  /**
   * The ref you should pass to the DuffelCardForm component.
   */
  ref: React.RefObject<DuffelCardFormActions>;

  /**
   *  Call this function to tell the component to save the card.
   */
  saveCard: () => void;

  /**
   *  Call this function to tell the component to create a card for temporary use.
   */
  createCardForTemporaryUse: () => void;
}

/**
 * This hook abstracts the ref for convinience and readability.
 * Add `ref` to the `DuffelCardForm` `ref` prop and call the functions to trigger the actions you'd like.
 */
export function useDuffelCardFormActions(): UseDuffelCardFormActionsHook {
  const ref = React.useRef<DuffelCardFormActions>(null);

  return {
    ref,
    saveCard: () => {
      if (ref.current) {
        ref.current.saveCard();
      } else {
        console.warn("Attempted to save card, but ref is null");
      }
    },
    createCardForTemporaryUse: () => {
      if (ref.current) {
        ref.current.createCardForTemporaryUse();
      } else {
        console.warn(
          "Attempted to create card for temporary use, but ref is null"
        );
      }
    },
  };
}
