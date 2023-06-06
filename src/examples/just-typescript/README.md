# duffel-components typescript example

## TL;DR

Start on the root of the `duffel-components` repository:

```sh
# build duffel-components for react env:
yarn react-build

# change directory to example folder
cd src/examples/just-typescript

# cleanup last install and build
rm -rf node_modules && rm -rf dist

# install new version
yarn

# build and watch example
yarn build

# open example
open src/index.html -a "Safari"
```

## Build duffel-components

First, navigate to the root folder of the duffel-components repository and run `yarn react-build` to build the package. It should output a react-dist folder on the root. This folder is the one we reference on `src/examples/just-typescript/package.json` dependencies under `duffel-components`

## Install dependencies

Once the package is built, you can cd into this directory and run `yarn` to install all dependencies. If there are changes to `react-dist` since your last install, you'll need to `rm -rf node_modules`, otherwise the updates build will not be installed.

## Run example

Finally, run `yarn dev` to build `src/examples/just-typescript/src/index.tsx`. This will produce `src/examples/just-typescript/dist` folder that is referenced by `src/examples/just-typescript/src/index.html`. You can then open `src/examples/just-typescript/src/index.html` on your browser to see the example up and running.
