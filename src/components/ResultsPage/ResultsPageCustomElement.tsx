import { createRoot, Root } from "react-dom/client";
import { ResultsPage, ResultsPageProps } from "./ResultsPage";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "results-page": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const CUSTOM_ELEMENT_TAG = "results-page";

type RenderArguments = Pick<ResultsPageProps, "data" | "onSelect">;

class ComponentCustomElement extends HTMLElement {
  /**
   * The React root for displaying content inside a browser DOM element.
   */
  private root!: Root;

  /**
   * `connectedCallback` is called to initialise the custom element
   */
  connectedCallback() {
    const container = document.createElement("div");
    this.appendChild(container);

    this.root = createRoot(container);
  }

  /**
   * When this function is called, it will render/re-render
   * the component with the given props.
   */
  public render(withProps: RenderArguments) {
    if (!this.root) {
      throw `It was not possible to render '${CUSTOM_ELEMENT_TAG} because 'this.root' is missing.`;
    }

    this.root.render(<ResultsPage {...withProps} />);
  }
}

window.customElements.get(CUSTOM_ELEMENT_TAG) ||
  window.customElements.define(CUSTOM_ELEMENT_TAG, ComponentCustomElement);

function tryToGetComponent(caller: string): ComponentCustomElement {
  const element =
    document.querySelector<ComponentCustomElement>(CUSTOM_ELEMENT_TAG);
  if (!element) {
    throw new Error(
      `Could not find '${CUSTOM_ELEMENT_TAG} element in the DOM. Maybe you need to call ${caller} after 'window.onload'?`
    );
  }
  return element;
}

export function renderResultsPageCustomElement(props: RenderArguments) {
  const element = tryToGetComponent("renderResultsPage");
  element.render(props);
}

// export function onResultsPageFinished(
//   onFinished: ResultsPageProps["onFinished"]
// ) {
//   const element = tryToGetComponent("onResultsPageFinished");

//   // using `as EventListener` here because typescript doesn't know the event type for `onPayloadReady`
//   // There's a few different suggestions to resolve this seemed good enough
//   // You can learn more here: https://github.com/microsoft/TypeScript/issues/28357
//   element.addEventListener("onFinished", onFinished as EventListener);
// }
