# duffel-components client-side example

## Setup

```sh
# .env.local

# The Duffel API environment we want to make requests to.
# Remember to update the key below if this value changes.
# DUFFEL_API_URL=https://api.duffel.com # production
DUFFEL_API_URL=https://localhost:4000 # development (for Duffel engineers only)

# Used to authenticate our
# example server to talk to Duffel
# DUFFEL_API_TOKEN=duffel_test_**** # production
DUFFEL_API_TOKEN=test_duffel_dev_rw # development (for Duffel engineers only)


# The url for the component CDN.
# This is used to load both the styles an
# COMPONENT_CDN=https://assets.duffel.com/components # production
COMPONENT_CDN=https://localhost:3200 # development
```

## Run the example

This is a basic example that doesn't rely on the Duffel API, from the root of the repository run `yarn run-example:client-side`. This command will:

1. Serve the Duffel component bundle and watch for changes to rebuild on port `3200`. This can also be done with `yarn dev`
2. Host a basic `index.html` with `http-server`. The example page will be ready on port `6262`. This can be done with `yarn run-client-side-server`
