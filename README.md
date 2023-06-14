# @duffel/components

This package is a component library to help you build your travel product using the [Duffel API](https://duffel.com/docs).

## Get started

### Installing

```sh
yarn add @duffel/components
# -- or --
npm i @duffel/components
```

### (alternative) Load from CDN:

```html
<script src="https://assets.duffel.com/components/3.0.5-canary/index.js"></script>
```

## How do I integrate this into my website?

1. Please start by reading our integration guide on https://duffel.com/docs/guides/ancillaries-component

## Integration examples

1. **client-side** | This example loads a local version of the components using a `script` tag. It uses a fixture for the

   - [Find it on src/examples/client-side](src/examples/client-side)

2. **full-stack** | This example loads a local version of the components using a `script` tag. It will search and retrieve an offer from the Duffel API and render the ancillaries component custom element with its `offer_id` and `client_key`. As soon as a service modal is closed it will create a test order with the given payload.

   - [Find it on src/examples/full-stack](src/examples/full-stack)

3. **just-typescript** | This example imports a local version of `@duffel/components` and renders the custom element with an offer fixture once the page loads.

   - [Find it on src/examples/just-typescript](src/examples/just-typescript)

4. **react-app** | This example imports a local version of `@duffel/components` and renders the a react element with an offer fixture.
   - [Find it on src/examples/react-app](src/examples/react-app)

## What components are available?

### Ancillaries component

The ancillaries component allows your customers to add ancillaries to their order. It's simple to add to your website and can be customised to fit your brand. This component is avaiable through npm and our cdn.

- [Find live demo on codesandbox.io&nbsp;&nbsp;↗](https://codesandbox.io/s/duffel-ancillaries-example-1nxuu7)

#### more coming soon...
