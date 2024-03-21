import { createRoot, Root } from "react-dom/client";
import { Place } from "./lib/getPlacesFromMapboxClient";
import {
  MapboxPlacesLookup,
  MapboxPlacesLookupProps,
} from "./MapboxPlacesLookup";

const CUSTOM_ELEMENT_TAG = "duffel-mapbox-places-lookup";

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

type MapboxPlacesLookupCustomElementRenderArguments = Pick<
  MapboxPlacesLookupProps,
  "mapboxPublicKey" | "placeholder" | "inputClassName"
>;

class MapboxPlacesLookupCustomElement extends HTMLElement {
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
   * the `MapboxPlacesLookup` component with the given props.
   */
  public render(withProps: MapboxPlacesLookupCustomElementRenderArguments) {
    if (!this.root) {
      throw "It was not possible to render `duffel-payments` because `this.root` is missing.";
    }

    this.root.render(
      <MapboxPlacesLookup
        {...withProps}
        onPlaceSelected={(place) => {
          this.dispatchEvent(
            new CustomEvent("onPlaceSelected", {
              composed: true,
              detail: { place },
            })
          );
        }}
      />
    );
  }
}

window.customElements.get(CUSTOM_ELEMENT_TAG) ||
  window.customElements.define(
    CUSTOM_ELEMENT_TAG,
    MapboxPlacesLookupCustomElement
  );

function tryToGetCustomElement(
  caller: string
): MapboxPlacesLookupCustomElement {
  const element =
    document.querySelector<MapboxPlacesLookupCustomElement>(CUSTOM_ELEMENT_TAG);
  if (!element) {
    throw new Error(
      `Could not find ${CUSTOM_ELEMENT_TAG} element in the DOM. Maybe you need to call ${caller} after 'window.onload'?`
    );
  }
  return element;
}

export function renderMapboxPlacesLookupCustomElement(
  props: MapboxPlacesLookupCustomElementRenderArguments
) {
  const element = tryToGetCustomElement(
    "renderMapboxPlacesLookupCustomElement"
  );
  element.render(props);
}

type OnPlaceSelectedCustomEvent = CustomEvent<{
  place: Place;
}>;

export function onMapboxPlacesLookupPlaceSelected(
  onPlaceSelected: MapboxPlacesLookupProps["onPlaceSelected"]
) {
  const element = tryToGetCustomElement("onDuffelAncillariesPayloadReady");
  const eventListener = (event: OnPlaceSelectedCustomEvent) => {
    onPlaceSelected(event.detail.place);
  };

  // using `as EventListener` here because typescript doesn't know the event type for `onPlaceSelected`
  // There's a few different suggestions to resolve it. This seemed good enough
  // You can learn more here: https://github.com/microsoft/TypeScript/issues/28357
  element.addEventListener("onPlaceSelected", eventListener as EventListener);
}
