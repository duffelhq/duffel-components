# duffel-components full-stack example

## Setup

```sh
# .env.local

# The Duffel API environment we want to make requests to.
# Remember to update the key below if this value changes.
# DUFFEL_API_URL=https://api.duffel.com # production
DUFFEL_API_URL=https://localhost:4000 # development (for Duffel engineers only)

# Used to authenticate our
# example server to talk to Duffel
# DUFFEL_API_TOKEN=duffel_test_**** # production (find it on https://app.duffel.com/YOUR_ORG/test/developers/tokens)
DUFFEL_API_TOKEN=test_duffel_dev_rw # development (for Duffel engineers only)


# The url for the component CDN.
# This is used to load both the styles an
# COMPONENT_CDN=https://assets.duffel.com/components # production
COMPONENT_CDN=http://localhost:8000 # development
```

## Run the example

This example has a server that will reach out to the Duffel API to search and retrieve an offer.
To talk to the API we'll define the url to the API environment we want and .
Please add the following to `.env.local`:

This is a 'real life' example, where it uses a real offer ID and client key retrieved from the Duffel API. To run this, use `yarn run-example:full-stack`. This command will:

1. Serve the Duffel component bundle and watch for changes to rebuild on port `8000`. This can also be done with `yarn dev`
2. Run the full stack server using node. The example page will be ready on port `6262`. This can be done with `yarn run-full-stack-server`
