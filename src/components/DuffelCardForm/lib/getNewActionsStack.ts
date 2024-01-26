import { DuffelCardFormAction } from "./types";

export function getNewActionsStack(
  previousActions: DuffelCardFormAction[],
  newActions: DuffelCardFormAction[]
): DuffelCardFormAction[] {
  if (newActions.length <= previousActions.length) {
    console.warn(
      "`actions` prop has changed and its length is smaller than its previous state. This is not supported. It's advised to use the `useDuffelCardFormActions` hook to manage the actions array instead."
    );
    return newActions;
  }

  const newActionsStackSize = newActions.length - previousActions.length;
  return newActions.slice(-newActionsStackSize);
}
