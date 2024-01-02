import { Root, createRoot } from "react-dom/client";

function tryToGetDuffelAncillariesCustomElement<
  T_CustomElementClass extends HTMLElement
>(CUSTOM_ELEMENT_TAG: string): T_CustomElementClass {
  const element =
    document.querySelector<T_CustomElementClass>(CUSTOM_ELEMENT_TAG);
  if (!element) {
    throw new Error(
      `Could not find ${CUSTOM_ELEMENT_TAG} element in the DOM. Has 'window.onload' been called?`
    );
  }
  return element;
}

function makeCustomElementClass<T_RenderFunctionProps>(
  Component: React.FC<T_RenderFunctionProps>
) {
  return class CustomElement extends HTMLElement {
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
     * the `DuffelAncillaries` component with the given props.
     */
    public render(withProps: T_RenderFunctionProps) {
      if (!this.root) {
        throw "It was not possible to render `duffel-ancillaries` because `this.root` is missing.";
      }

      this.root.render(
        <Component
          {...withProps}
          // figure out how to add the event functions here... and then eport the handlers
        />
      );
    }
  };
}

export function makeCustomElement<T_RenderFunctionProps>(
  CUSTOM_ELEMENT_TAG: string,
  Component: React.FC<T_RenderFunctionProps>
) {
  const CustomElementClass =
    makeCustomElementClass<T_RenderFunctionProps>(Component);

  // define the element
  window.customElements.get(CUSTOM_ELEMENT_TAG) ||
    window.customElements.define(CUSTOM_ELEMENT_TAG, CustomElementClass);

  // define render function
  const renderFunction = function (props: T_RenderFunctionProps) {
    const element = tryToGetDuffelAncillariesCustomElement(
      "renderDuffelAncillariesCustomElement"
    );
    element.render(props);
  };

  return { renderFunction };
}
