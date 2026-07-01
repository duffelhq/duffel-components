# @duffel/components

This package is a component library to help you build your travel product using the [Duffel API](https://duffel.com/docs).

## Getting started

There are 3 different ways to integrate the components into your website. This will depend on which technology you are using. We'll use the ancillaries component as an example, but the same steps will apply for other components.

### Integrating React component

1. Install the package:

   ```sh
   yarn add @duffel/components
   # -- or --
   npm i @duffel/components
   ```

2. Import the component from `@duffel/components`

   ```javascript
   import { DuffelAncillaries } from "@duffel/components";
   ```

3. Render the component with the desired props

   ```jsx
   <DuffelAncillaries
     offer={offerFromYourBackend} // The offer object from your backend
     seat_maps={seatMapsFromYourBackend}
     services={["bags", "seats"]}
     passengers={[...]}
     onPayloadReady={console.log}
   />
   ```

### Integrating HTML custom element

If you are not using React but still in a node environment, you can:

1. Install the package:

   ```sh
   yarn add @duffel/components
   # -- or --
   npm i @duffel/components
   ```

2. Import the component render function and event listeners from `@duffel/components/custom-elements`

   ```javascript
   import {
     renderDuffelAncillariesCustomElement,
     onDuffelAncillariesPayloadReady,
   } from "@duffel/components/custom-elements";
   ```

3. Include the custom element in your HTML

   ```html
   <duffel-ancillaries></duffel-ancillaries>
   ```

4. Call the render function with the right properties to render the custom element:

   ```javascript
   renderDuffelAncillariesCustomElement({
     offer: offerFromYourBackend,
     seat_maps: seatMapsFromYourBackend,
     services: ["bags", "seats"],
     passengers: [...],
   });
   ```

5. Set up listeners for events triggered by the component:

   ```javascript
   onDuffelAncillariesPayloadReady((data, metadata) => {
     console.table(data);
     console.table(metadata);
   });
   ```

### Integrating custom element without node

If you are not in a node environment and can't rely on npm to install the package, we make it available through our CDN. Here's how to integrate it:

1. Include a script tag

   ```html
   <!--
     Replace VERSION with the desired version.
     You can find them all on https://www.npmjs.com/package/@duffel/components?activeTab=versions
   
     Replace COMPONENT with the desired component you'd like to use.
     You can find the components available in the `./cdn-dist` directory after running `yarn build-and-publish --dry-run`
   
     For example, for the duffel ancillaries component on version 3.3.1, use:
     https://assets.duffel.com/components/3.3.1/duffel-ancillaries.js
   -->

   <script src="https://assets.duffel.com/components/VERSION/COMPONENT.js"></script>
   ```

2. Include the custom element tag in your HTML:

   ```html
   <duffel-ancillaries></duffel-ancillaries>
   ```

3. Render the component with the required data. You can safely call this function as many times as you want, e.g., when your passenger data changes.

   ```javascript
   const duffelAncillariesElement = document.querySelector("duffel-ancillaries");

   duffelAncillariesElement.render({
     offer: offerFromYourBackend,
     seat_maps: seatMapsFromYourBackend,
     services: ["bags", "seats"],
     passengers: [...],
   });
   ```

4. Listen to the 'onPayloadReady' event on the component. `event.detail.data` contains the payload you need to send to Duffel's API to create an order.

   ```javascript
   const duffelAncillariesElement =
     document.querySelector("duffel-ancillaries");

   duffelAncillariesElement.addEventListener("onPayloadReady", (event) =>
     console.log("onPayloadReady\n", event.detail),
   );
   ```

## FAQ

### Are there integration guides?

- [Integrating the ancillaries component into your booking flow](https://duffel.com/docs/guides/ancillaries-component).
- [Integrating the customer card form into your checkout page](https://duffel.com/docs/guides/paying-with-customer-cards).

More guides are coming soon.

### Is there a runnable example?

Yes. The `example` folder contains the repository's single runnable example. It
loads `duffel-ancillaries.js` from the CDN, fetches a live offer and seat maps
through a local server, and renders the `<duffel-ancillaries>` custom element.

Configure the environment in `.env.local` with:

```sh
DUFFEL_API_TOKEN=...
```

The example defaults to production Duffel API and token proxy URLs. Override
those URLs in `.env.local` only when you need development or staging. Run it
with:

```sh
yarn run-example
```

### Where are the other component examples?

Storybook is the complete reference for available components, important visual
states, and integration types. Run it with:

```sh
yarn storybook
```

The runnable example intentionally stays small and focused on the CDN
custom-element integration.

### What components are available through npm?

The list of React components can be found in `src/index.ts`. If you are using custom elements, you can find all render functions and event listeners in `src/custom-elements.ts`.

### What components are available through the CDN?

Please check `entryPoints` in `config/esbuild.base.config.js`. It lists all the components and browser functions we'll build and upload to the CDN.
