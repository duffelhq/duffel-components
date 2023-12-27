import { createRoot, Root } from "react-dom/client";
import { StaysRating, StaysRatingProps } from "./StaysRating";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "duffel-stays-rating": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const CUSTOM_ELEMENT_TAG = "duffel-stays-rating";

type DuffelStaysRatingCustomElementRenderArguments = StaysRatingProps;

class DuffelStaysRatingCustomElement extends HTMLElement {
  /**
   * The React root for displaying content inside a browser DOM element.
   */
  private root!: Root;

  /**
   * `connectedCallback` is called to initialise the custom element
   */
  connectedCallback() {
    const container = document.createElement("div");
    this.attachShadow({ mode: "open" }).appendChild(container);

    this.root = createRoot(container);
  }

  /**
   * When this function is called, it will render/re-render
   * the `StaysRating` component with the given props.
   */
  public render(withProps: DuffelStaysRatingCustomElementRenderArguments) {
    if (!this.root) {
      throw "It was not possible to render `duffel-stays-rating` because `this.root` is missing.";
    }

    this.root.render(<StaysRating {...withProps} />);
  }
}

window.customElements.get(CUSTOM_ELEMENT_TAG) ||
  window.customElements.define(
    CUSTOM_ELEMENT_TAG,
    DuffelStaysRatingCustomElement
  );

function tryToGetDuffelStaysRatingCustomElement(
  caller: string
): DuffelStaysRatingCustomElement {
  const element =
    document.querySelector<DuffelStaysRatingCustomElement>(CUSTOM_ELEMENT_TAG);
  if (!element) {
    throw new Error(
      `Could not find duffel-stays-rating element in the DOM. Maybe you need to call ${caller} after 'window.onload'?`
    );
  }
  return element;
}

export function renderDuffelStaysRatingCustomElement(
  props: DuffelStaysRatingCustomElementRenderArguments
) {
  const element = tryToGetDuffelStaysRatingCustomElement(
    "renderDuffelStaysRatingCustomElement"
  );
  element.render(props);
}
