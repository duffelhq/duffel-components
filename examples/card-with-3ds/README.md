# card with 3DS example

This example will demonstarte how to use the `createThreeDSecureSession` function.
The server will get an offer, tokenise a card and create a client key.
These values will be aailable on the client to call the function.

## how to run it?

1. Run platform (including the token-proxy service in docker)
2. Create ssl certificate with `yarn create-local-ssl-certificate`
3. Run the esbuild dev server with https using `yarn dev`
4. Run the example with `yarn run-3ds-example`
