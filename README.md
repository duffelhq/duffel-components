# duffel-ancillaries

## What is this?

The ancillaries component is a JavaScript component you can use to allow your customers to add ancillaries to their order. It's simple to add to your website and can be customised to fit your brand.

> [See live demo here](https://codesandbox.io/s/duffel-ancillaries-example-1nxuu7)

## How do I integrate this into my website?

1. Please start by reading our integration guide on https://duffel.com/docs/_preview/ancillaries-component
2. You can also find examples code in the `example` folder (see below).

## Integration examples

We have two ways to run the example.

### 1. Full stack

This example has a server that will reach out to the Duffel API to search and retrieve an offer.
To talk to the API we'll define the url to the API environment we want and .
Please add the following to `.env.local`:

```sh
# .env.local

# Used to authenticate our
# example server to talk to Duffel
DUFFEL_API_TOKEN=test_duffel_dev_rw

# The Duffel API environment we want
# to talk. Remember to update the key
# if this value changes.
DUFFEL_API_URL=https://localhost:4000;
```

This is a 'real life' example, where it uses a real offer ID and client key retrieved from the Duffel API. To run this, use `yarn run-example:full-stack`. This command will:

1. Serve the Duffel component bundle and watch for changes to rebuild on port `8000`. This can also be done with `yarn dev`
2. Run the full stack server using node. The example page will be ready on port `6262`. This can be done with `yarn run-full-stack-server`

### What do I need to do to use the component with a local version of the Duffel API?

- Make sure you visit https://localhost:4000 to allow your browser to make requests to it.
- Make sure the org your are using has the [flags enabled](http://localhost:4242/features):
  - `ancillaries_component_enable_client_key`
  - `ancillaries_component_enable_client_key_endpoints`

### 2. Client side with fixtures

For a more basic example that doesn't rely on the Duffel API, use `yarn run-example:client-side`.

This command will:

1. Serve the Duffel component bundle and watch for changes to rebuild on port `8000`. This can also be done with `yarn dev`
2. Host a basic `index.html` with `http-server`. The example page will be ready on port `6262`. This can be done with `yarn run-client-side-server`

## How to upload new changes to our CDN

### Setup `gcloud`

Our CDN is [hosted on Google Cloud Platform](<https://console.cloud.google.com/storage/browser/duffel-assets/components/ancillaries?pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))&project=duffel-prod-fda1bc52&prefix=&forceOnObjectsSortingFiltering=false>). To upload new changes you'll need to have `gcloud` intalled and authenticate with GCP. You can do this by running `gcloud auth login` and following the instructions.

### Setup env variables under `.env.local`:

Make sure you have an up-to-date version of `.env.build`

```sh
# .env.build

# Include the base url for the Duffel API.
# This variable is here to give us the ability to build a dist version that points to a local environment.
# If no value is provided, the default `https://api.duffel.com` will be used.
DUFFEL_API_URL=https://api.duffel.com

# This is needed so the component knows the url base to use for its stylesheet
# This variable is here so we can release component versions that may point to local environments or bypass the cache.
# If no value is provided, the default `https://assets.duffel.com/ancillaries-component` will be used.
COMPONENT_CDN=https://assets.duffel.com/components/ancillaries

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

### Upload as latest

You can also upload the current version (Following [`package.json`](./package.json) definition) to the `latest` folder with:

```sh
yarn upload-to-cdn --latest
```
