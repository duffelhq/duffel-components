interface CommonCardData {
  id: string;
  last_4_digits: string;
  live_mode: false;
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
  /** The card will no longer be available for use after this time. */
  unavailable_at: string;
}

export interface SaveCardData extends CommonCardData {
  saved: true;
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
   * - `to-create-card-for-temporary-use`: The full form will be shown. You may also use this intent for the use case of using and saving the card.
   * - `to-use-saved-card`: When using this intent also provide the saved card ID. Only a cvv field will be rendered.
   * - `to-save-card`: The form will be shown without the cvv field. This only allows you to save a card for future use,
   *    but not create an id for immediate, temporary use. For the use case of saving during checkout or save + use, use the `to-create-card-for-temporary-use` intent.
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
