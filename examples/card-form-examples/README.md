# card-form-examples

This a set of integration examples for the Duffel Card Component.

## How to use

1. Install with `yarn`
2. Create a `.env.local` which should include `DUFFEL_API_KEY`, `DUFFEL_API_ORIGIN`.
3. If your `DUFFEL_API_ORIGIN` is https:localhost also include `NODE_TLS_REJECT_UNAUTHORIZED=0` to `.env.local`
4. If you want the component to point to the local development server also set `NEXT_PUBLIC_TOKEN_PROXY_ENV=development`
5. Run the example app with `yarn dev`
