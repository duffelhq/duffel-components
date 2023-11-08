import { createRoot, Root } from "react-dom/client";
import { SearchPage, SearchPageProps } from "./SearchPage";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "search-page": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const CUSTOM_ELEMENT_TAG = "search-page";

type RenderArguments = Pick<SearchPageProps, "data" | "getSuggestions">;

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
      throw `It was not possible to render '${CUSTOM_ELEMENT_TAG}' because 'this.root' is missing.`;
    }

    this.root.render(<SearchPage {...withProps} />);
  }
}

window.customElements.get(CUSTOM_ELEMENT_TAG) ||
  window.customElements.define(CUSTOM_ELEMENT_TAG, ComponentCustomElement);
