import { createRoot, Root } from "react-dom/client";
import { StaysRating, StaysRatingProps } from "./StaysRating";

const CUSTOM_ELEMENT_TAG = "duffel-stays-rating";

type CustomElementRenderArguments = StaysRatingProps & { elementId: string };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [CUSTOM_ELEMENT_TAG]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

class CustomElement extends HTMLElement {
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
   * the component with the given props.
   */
  public render(withProps: CustomElementRenderArguments) {
    if (!this.root) {
      throw `It was not possible to render ${CUSTOM_ELEMENT_TAG} because 'this.root' is missing.`;
    }

    this.root.render(<StaysRating {...withProps} />);
  }
}

window.customElements.get(CUSTOM_ELEMENT_TAG) ||
  window.customElements.define(CUSTOM_ELEMENT_TAG, CustomElement);

function tryToGetCustomElement(
  caller: string,
  elementId: string,
): CustomElement {
  const element = document.querySelector<CustomElement>(
    elementId ? `#${elementId} > ${CUSTOM_ELEMENT_TAG}` : CUSTOM_ELEMENT_TAG,
  );
  if (!element) {
    throw new Error(
      `Could not find ${elementId} element in the DOM. Maybe you need to call ${caller} after 'window.onload'?`,
    );
  }
  return element;
}

export function renderDuffelStaysRatingCustomElement(
  props: CustomElementRenderArguments,
) {
  const element = tryToGetCustomElement(
    "renderDuffelStaysRatingCustomElement",
    props.elementId,
  );
  element.render(props);
}
