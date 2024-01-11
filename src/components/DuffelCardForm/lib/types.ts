export interface CreateCardForTemporaryUseData {
  id: string;
  live_mode: false;
}

export interface CreateCardForTemporaryUseError {
  status: number;
  message: string;
}

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

export type DuffelCardFormActions =
  | "validate"
  | "create-card-for-temporary-use";

export interface DuffelCardFormProps {
  /**
   * The client key present in the Quote object.
   */
  clientKey: string;

  /**
   * The styles to apply to the iframe input elements.
   */
  styles?: DuffelCardFormStyles;

  /**
   * If you want to develop with in a different environment of the token proxy, you can choose it here.
   *
   * @default: `production`
   */
  tokenProxyEnvironment?: "development" | "staging" | "production";

  /**
   * The actions you'd like the component to perform.
   *
   * This prop is a dependecy of a useEffect hook in the component
   * and so when it's changed it will perform the action you specify.
   *
   * The action `create-card-for-temporary-use` will only happen once `validate` has been successful.
   *
   */
  actions: DuffelCardFormActions[];

  /**
   * This function will be called when the card form validation has been successful.
   */
  onValidateSuccess: () => void;

  /**
   * If the card form validation is successful but data is changed afterwards,
   * making it invalid, this function will be called.
   */
  onValidateFailure: () => void;

  /**
   * This function will be called when the card has been created for temporary use.
   *
   * This callback will only be triggered if the `create-card-for-temporary-use`
   * action is present in the `actions` prop.
   */
  onCreateCardForTemporaryUseSuccess: (
    data: CreateCardForTemporaryUseData
  ) => void;

  /**
   * This function will be called when the component has failed to create the card for temporary use.
   *
   * This callback will only be triggered if the `create-card-for-temporary-use`
   * action is present in the `actions` prop.
   */
  onCreateCardForTemporaryUseFailure: (
    error: CreateCardForTemporaryUseError
  ) => void;
}
