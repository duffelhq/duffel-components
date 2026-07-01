# Duffel Components CDN example

This is the single runnable example for this repository. It demonstrates the
browser-only CDN integration by loading `duffel-ancillaries.js` with a `<script>`
tag, then rendering the `<duffel-ancillaries>` custom element with data fetched
by the local TypeScript server in `example/index.ts`.

Storybook covers the rest of the component states and integration types.

## Configure the environment

The example reads `.env.local` from the repository root. Only
`DUFFEL_API_TOKEN` is required:

```sh
# .env.local

DUFFEL_API_TOKEN=duffel_test_...
```

By default the example uses production URLs:

```sh
DUFFEL_API_URL=https://api.duffel.com
TOKEN_PROXY_URL=https://api.duffel.cards
```

You can override either value in `.env.local`. The server derives the
environment name from those URLs:

- `localhost` means `development`
- URLs containing `staging` mean `staging`
- everything else means `production`

By default the page loads the component script from
`https://assets.duffel.com/components/<package-version>/duffel-ancillaries.js`.
To test a locally built CDN bundle, run `yarn dev` in another terminal and set:

```sh
COMPONENT_CDN=https://localhost:3200
```

## Run the example

The example server uses `@oxc-node/core/register`, so it requires Node 20.19.0
or newer.

```sh
yarn run-example
```

This runs the TypeScript server with
`node --import @oxc-node/core/register example/index.ts`.

The page is served at `http://localhost:3000`.
