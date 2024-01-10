## Debug mode

The component takes a `debug` boolean prop. When enabled, debug output is logged to the console, with useful info like the props that were passed in. This is intended both for our internal use and for users integrating it.

Debug mode is enabled by default in all of this repository's local environments (e.g. Storybook).

Debug mode makes use of a logger, which selectively outputs to the console based on whether or not debug mode is enabled. When it makes sense, make use of the logger to output useful information. See `@lib/logging` for how to use it.

## How to upload new changes to our CDN

### Setup `gcloud`

Our CDN is [hosted on Google Cloud Platform](<https://console.cloud.google.com/storage/browser/duffel-assets/components/ancillaries?pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))&project=duffel-prod-fda1bc52&prefix=&forceOnObjectsSortingFiltering=false>). To upload new changes you'll need to have `gcloud` intalled and authenticate with GCP. You can do this by running `gcloud auth login` and following the instructions.

### Setup environment

Make sure you have an up-to-date version of `.env.build`:

```sh
# .env.build

# Include the base url for the Duffel API.
# This variable is here to give us the ability to build a dist version that points to a local environment.
# If no value is provided, the default `https://api.duffel.com` will be used.
DUFFEL_API_URL=https://api.duffel.com

# This is needed so the component knows the url base to use for its stylesheet
# This variable is here so we can release component versions that may point to local environments or bypass the cache.
# If no value is provided, the default `https://assets.duffel.com/ancillaries-component` will be used.
COMPONENT_CDN=https://assets.duffel.com/components

# The auth token is so we send data
# to sentry during the build.
# This is helpful when CI is
# building releases, locally not as much.
# You can get it here: https://duffel.sentry.io/settings/account/api/auth-tokens
SENTRY_AUTH_TOKEN=
```

### Upload to CDN

To upload the latest version of the component to the CDN, run:

```sh
yarn upload-to-cdn
```

This command will:

1. Build the component. the output will be in the `dist` folder.

2. Upload the build to the version folder on GCP storage.

   - The build version is defined in [`package.json`](/package.json) under the `version` attribute.
   - [You can find uploaded versions here](<https://console.cloud.google.com/storage/browser/duffel-assets/components/ancillaries?pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))&project=duffel-prod-fda1bc52&prefix=&forceOnObjectsSortingFiltering=false>)
   - A version folder will be created if it doesn't exist.
   - The version folder will be overwritten if it already exists.

3. Upload the sourcemaps for that version to Sentry

### Build component

#### Build for CDN upload

```sh
yarn cdn-build # Build will output to ./cdn-dist
```

#### Build for npm publishing

```sh
yarn react-build # Build will output to ./react-dist
```

You can see this build referenced on:

- `src/examples/react-app`
- `src/examples/just-typescript`
