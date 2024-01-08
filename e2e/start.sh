# What's this script for?
#
# This script starts and kills the servers we want to run the end to end tests on.
# It also builds the e2e script and runs it for each of those tests.

set -e

# Load env variables for running the examples
source .env.local

## Build the e2e script
esbuild e2e/index.e2e.ts --outfile=e2e/dist/index.e2e.cjs --format=cjs --platform=node --bundle --tsconfig=scripts.tsconfig.json

# Test loading the component from our CDN
## Run `using-cdn` example
DUFFEL_API_URL=$DUFFEL_API_URL DUFFEL_API_TOKEN=$DUFFEL_API_TOKEN node examples/using-cdn/server.mjs &
FULL_STACK_WITH_CDN_PID=$!
echo -e "\n'using-cdn' example running on process $FULL_STACK_WITH_CDN_PID"

## Run the test against it
node e2e/dist/index.e2e.cjs http://localhost:3000

## Now we are done, let's kill that server
kill $FULL_STACK_WITH_CDN_PID

## TODO: will run the other examples here:
## [ ] example with custom element
## [ ] example with react

## And later on:
## extend test to cover other components
