interface CommonCardData {
  /**
   * Duffel's unique identifier for the resource
   */
  id: string;

  /**
   * Whether the card was created in live mode. This field will be set to true
   * if the card was created in live mode, or false if it was created in test mode.
   */
  live_mode: boolean;

  /**
   * Last 4 digits of the card number.
   */
  last_4_digits: string;

  /**
   * Card brand name.
   */
  brand:
    | "visa"
    | "mastercard"
    | "uatp"
    | "american_express"
    | "diners_club"
    | "jcb"
    | "discover";
}

interface CardActionError {
  status: number;
  message: string;
}

export interface SecurityPolicyViolationData {
  violated_directive: string;
}

export interface CreateCardForTemporaryUseData extends CommonCardData {
  saved: false;

  /**
   * The ISO 8601 datetime at which the card will be automatically deleted.
   */
  unavailable_at: string;
}

export interface SaveCardData extends CommonCardData {
  saved: true;

  /**
   * The ISO 8601 datetime at which the card will be automatically deleted.
   */
  unavailable_at: null;
}

export interface SaveCardError extends CardActionError {}

export interface CreateCardForTemporaryUseError extends CardActionError {}

/**
 * An object where each key value pair is a style to be applied.
 * e.g. { 'background-image': 'red', 'color': '#000', 'margin-inline': '8px' }
 *
 * Note: If you rely on css variables these will not work as they are
 * defined on a stylesheet the component does not have access to.
 */
type StylesMap = Record<string, string>;

export interface InteractiveElementStyles {
  default?: StylesMap;
  hover?: StylesMap;
  active?: StylesMap;
  focus?: StylesMap;
}

export interface DuffelCardFormStyles {
  input?: InteractiveElementStyles;
  select?: InteractiveElementStyles;
  label?: StylesMap;
  inputErrorMessage?: StylesMap;
  sectionTitle?: StylesMap;
  layoutGrid?: StylesMap;
}

export type DuffelCardFormAction =
  | "validate"
  | "save-card"
  | "create-card-for-temporary-use";

export type DuffelCardFormIntent =
  | "to-create-card-for-temporary-use"
  | "to-use-saved-card"
  | "to-save-card";

export interface DuffelCardFormProps {
  /**
   * The client key retrieved from the Duffel API.
   */
  clientKey: string;

  /**
   * The styles to apply to the iframe input elements.
   */
  styles?: DuffelCardFormStyles;

  /**
   * This value is intended for Duffel engineers to load the card form iframe
   * from different environments of our [token proxy service](https://github.com/duffelhq/token-proxy).
   *
   * @default: `production`
   */
  tokenProxyEnvironment?: "development" | "staging" | "production";

  /**
   * The card intent defines what the form is meant to look like.
   * It can be one of:
   *
   * - `to-create-card-for-temporary-use`: The full form will be shown. You may also use this intent for the use case of saving and using the card.
   * - `to-use-saved-card`: Only a CVC field will be shown. When using this intent a saved card ID is required.
   * - `to-save-card`: The form will be shown without the CVC field. This only allows you to save a card for future use,
   *    but not create an ID for immediate, temporary use. For the use case of saving and using during checkout, use the `to-create-card-for-temporary-use` intent.
  
   */
  intent: DuffelCardFormIntent;

  /**
   * Once a card is saved, in order to use it, travellers need to enter its cvv.
   * When using the `use-saved-card` intent, you must provide the card ID.
   */
  savedCardData?: { id: string; brand: string };

  /**
   * This function will be called when the card form validation has been successful.
   */
  onValidateSuccess?: () => void;

  /**
   * If the card form validation is successful but data is changed afterwards,
   * making it invalid, this function will be called.
   */
  onValidateFailure?: () => void;

  /**
   * This function will be called when the card has been created for temporary use.
   *
   * This callback will only be triggered if the `create-card-for-temporary-use`
   * action is present in the `actions` prop. Alternatively,
   * you may use the `triggerCreateCardForTemporaryUse` function from the
   * `useDuffelCardFormActions` hook.
   */
  onCreateCardForTemporaryUseSuccess?: (
    data: CreateCardForTemporaryUseData,
  ) => void;

  /**
   * This function will be called when the component has failed to create the card for temporary use.
   *
   * This callback will only be triggered if the `create-card-for-temporary-use`
   * action is present in the `actions` prop. Alternatively,
   * you may use the `triggerCreateCardForTemporaryUse` function from the
   * `useDuffelCardFormActions` hook.
   */
  onCreateCardForTemporaryUseFailure?: (
    error: CreateCardForTemporaryUseError,
  ) => void;

  /**
   * This function will be called when the card has been saved.
   *
   * This callback will only be triggered if the `save-card`
   * action is present in the `actions` prop. Alternatively,
   * you may use the `triggerSaveCard` function from the
   * `useDuffelCardFormActions` hook.
   */
  onSaveCardSuccess?: (data: SaveCardData) => void;

  /**
   * This function will be called when saving the card has failed.
   *
   * This callback will only be triggered if the `save-card`
   * action is present in the `actions` prop. Alternatively,
   * you may use the `triggerSaveCard` function from the
   * `useDuffelCardFormActions` hook.
   */
  onSaveCardFailure?: (error: SaveCardError) => void;

  /**
   * This function will be called if a security policy violation is detected.
   */
  onSecurityPolicyViolation?: (data: SecurityPolicyViolationData) => void;
}
