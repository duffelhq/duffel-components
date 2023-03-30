# Ancillaries component

## What is this?

This is a javascript library to give travel sellers a user interface for their customers to see and select ancillaries.

## How do I use it?

1. Import the package or reference the `script` from our CDN

   ```html
   <script src="http://assets.duffel.com/duffel-checkout/components/DuffelCheckoutCustomElement.js/index.js"></script>
   ```

2. Render the checkout element with the `offer_id` and `client_key`

   ```html
   <duffel-checkout
     id="duffel-checkout"
     offer_id="off_123"
     client_key="X15XYZ"
   ></duffel-checkout>
   ```

3. Create an event handler to capture the order creation payload

   ```js
   document
     .querySelector("duffel-checkout")
     .addEventListener(
       "onPayloadReady",
       function ({ detail: createOrderPayload }) {
         createOrderWith(createOrderPayload);
       }
     );
   ```

4. (Optional) Configure the component to work for your brand and your travellers

```js
document
  .querySelector("duffel-checkout")
  .addEventListener("connectedCallback", ({ detail: initialiseWith }) =>
    initialiseWith(OPTIONS)
  );
```

## connectedCallback handler arguments

| Name                      | **Possible values**                                             | **Example**                       |
| ------------------------- | --------------------------------------------------------------- | --------------------------------- |
| passengers                | [CreateOrderPayloadPassengers](src/types/CreateOrderPayload.ts) | `passengers: getValuesFromForm()` |
| styles                    | An object to customise the UI                                   |                                   |
| styles.primaryColor       | A comma separated list of the RGB values                        | `primaryColor: '34, 139, 34'`     |
| styles.buttonCornerRadius | A string with the button corner radius                          | `buttonCornerRadius: '8px'`       |
| styles.fontFamily         | A string with the name of the font family                       | `fontFamily: 'Menlo'`             |

## How to set up secrets

Our example has a server that will reach out to the Duffel API to search and retrieve an offer. To talk to the API we'll define some enviroment variables. Please add the following to `.env.local`:

```sh
# ./.env.local

# Used to authenticate our
# example server to talk to Duffel
DUFFEL_API_TOKEN=test_duffel_dev_rw

# The Duffel API environment we want
# to talk. Remember to update the key
# if this value changes.
DUFFEL_API_URL=https://localhost:4000;

# This value will be used to tell
# our example which version of the
# component to load.
COMPONENT_CDN=https://localhost:8000

# The auth token is so we send data
# to sentry during the build.
# This is helpful when CI is
# building releases, locally not as much.
SENTRY_AUTH_TOKEN=

```

## How to see the example running

Please use `yarn example-1`. This command will:

1. Serve the Duffel component bundle and watch for changes to rebuild on port `8000`. This can also be done with `yarn dev`
2. Run the example-1 server using node. The example page will be ready on port `6262`. This can be done with `yarn run-example-1`

## Working with platform locally

- Make sure you visit https://localhost:4000 to allow your browser to make requests to it
- Make sure the org your are using has the flags enabled:
  - `ancillaries_component_enable_client_key`
  - `ancillaries_component_enable_client_key_endpoints`
