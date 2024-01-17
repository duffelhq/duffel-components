import { DuffelCardFormIntent } from "./types";

export function getPathnameForIntent(intent: DuffelCardFormIntent): string {
  switch (intent) {
    case "to-use-saved-card":
      return `/use_saved_card`;
    case "to-save-card":
      return `/save_card`;
    case "to-create-card-for-temporary-use":
      return `/create_card_for_temporary_use`;
    default:
      if (!intent) {
        throw new Error(
          "Attempted to call `getPathnameForIntent` without an intent."
        );
      } else {
        throw new Error(
          `Attempted to call \`getPathnameForIntent\` but the intent "${intent}" is unknown.`
        );
      }
  }
}
