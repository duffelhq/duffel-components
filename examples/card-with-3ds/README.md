# card with 3DS example

This example will demonstrate how to use the `createThreeDSecureSession` function.
The server will get an offer, tokenize a card and create a client key.
These values will be available on the client to call the function.

## how to run it?

1. Run platform
2. Run token-proxy
3. Create ssl certificate with `yarn create-local-ssl-certificate`
4. Run the esbuild dev server with https using `yarn dev`
5. Add the following variable to `.env.local` file in the root of the repo:
   ```sh
   # These are the default values for working with platform and token proxy locally
   # Your values may differ depending on the env/db you are working with
   DUFFEL_API_TOKEN=test_duffel_dev_rw
   DUFFEL_API_URL=https://localhost:4000
   TOKEN_PROXY_URL=https://localhost:8000
   ```
6. Run the example with `yarn run-3ds-example`
