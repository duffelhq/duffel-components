# Ancillaries component

## What is this?

This is a javascript library to give travel sellers a user interface for their customers to see and select ancillaries.

## How do I use it?

1. Import the package or reference the `script` from our CDN

   ```html
   <script src="http://127.0.0.1:8000/index.js"></script>
   ```

2. Serialise a Duffel offer and set it as the value for the `offer` attribute. If you have a JS object just call `JSON.stringify`.

   ```html
   <duffel-checkout
     id="duffel-checkout"
     offer='{"id":"off_123"}'
   ></duffel-checkout>
   ```

3. Create an event handler to capture the order creation payload
   ```js
   document
     .getElementById("duffel-checkout")
     .addEventListener("onPayloadReady", ({ detail }) =>
       handleCreateOrderPayload(detail)
     );
   ```

## How do I contibute to the component?

You can run `yarn dev` to use `esbuild` to build, serve the output and watch for changes to repeat the process.

This will only build and serve the [component](/src/component/DuffelCheckout.tsx) wrapped in a [custom html element](/src/component/index.tsx). To use the component, you can then create your own page and import the script served on `http://localhost:8000/index.js` **or** just open one of our [examples](/src/examples) on your browser.
