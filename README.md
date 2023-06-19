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
<script src="https://assets.duffel.com/components/VERSION/duffel-ancillaries.js"></script>
<script src="https://assets.duffel.com/components/VERSION/duffel-payments.js"></script>
```

## How do I integrate this into my website?

1. Please start by reading our integration guide on https://duffel.com/docs/guides/ancillaries-component

## Integration examples

1. **client-side** | This example loads a local version of the components using a `script` tag. It uses a fixture for the offer and seat maps.

   - [Find it on src/examples/client-side](src/examples/client-side)

2. **full-stack** | This example loads a local version of the components using a `script` tag. It will search and retrieve an offer from the Duffel API and render the ancillaries component custom element with its `offer_id` and `client_key`. As soon as a service modal is closed it will create a test order with the given payload.

   - [Find it on src/examples/full-stack](src/examples/full-stack)

3. **just-typescript** | This example imports a local version of `@duffel/components` and renders the custom element with an offer fixture once the page loads.

   - [Find it on src/examples/just-typescript](src/examples/just-typescript)

4. **react-app** | This example imports a local version of `@duffel/components` and renders the a react element with an offer fixture.

   - [Find it on src/examples/react-app](src/examples/react-app)

5. **payments-custom-element** | This example demonstrates the use of the payments component loaded through a script tag

- [Find it on src/examples/payments-custom-element](src/examples/payments-custom-element)

6. **payments-just-typescript** | This example imports a local version of `@duffel/components` and renders the payments custom element with a fixture of the payment intent.

   - [Find it on src/examples/payments-just-typescript](src/examples/payments-just-typescript)

## What components are available?

### Ancillaries component

The ancillaries component allows your customers to add ancillaries to their order. It's simple to add to your website and can be customised to fit your brand. This component is avaiable through npm and our cdn.

- [Find live demo on codesandbox.io&nbsp;&nbsp;↗](https://codesandbox.io/s/duffel-ancillaries-example-1nxuu7)

### Payments component

Tha payments component provides a [PCI-compliant](https://help.duffel.com/hc/en-gb/articles/4409049543058) way for you to collect card payments for online bookings from your customers. To learnh more about how to work with Duffel payments please visit the [Collecting customer card payments guide](https://duffel.com/docs/guides/collecting-customer-card-payments).

#### more coming soon...
