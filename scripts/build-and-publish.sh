if [[ "$@" == *"--help"* ]]; then
    echo ""
    echo "Builds and publishes the package to npm and CDN."
    echo ""
    echo "Usage:"
    echo "  build-and-publish.sh [--dry-run] [--help]"
    echo ""
    echo "Options:"
    echo "  ‣  --help       Show this help message"
    echo "  ‣  --dry-run    Build and test, but do not publish"
    echo ""

    exit 0
fi

# Cleanup the old builds:
rm -rf ./cdn-dist
rm -rf ./react-dist

# Build for distribution

## For those that rely on <script></script>
node config/esbuild.cdn.config.js

## For those that rely on `npm i`
node config/esbuild.react.config.js

## For those that use typescript
tsc --project tsconfig.json
mv ./react-dist/src/* ./react-dist/
echo 'export * from "@duffel/api/types"' >>./react-dist/types/index.d.ts
rm -rf ./react-dist/src
rm -rf ./react-dist/scripts

# We can't export just types from `src/types/index.ts` file otherwise esbuild will fail to build
# That happens because `@duffel/api/types` is not an actual module, just a typescript declaration
echo 'export * from "@duffel/api/types"' >>./react-dist/types/index.d.ts

# Moves package json to build folder, we'll publish from it
cp package.json ./react-dist/package.json
cp README.md ./react-dist/README.md

# Moves readme file so when we publish from the react-dist folder our npm page will have all the info people need
cp README.md ./react-dist/README.md

# Only upload to CDN and publish to npm if it's not a dry run
if [[ "$@" != *"--dry-run"* ]]; then
    # Upload css, js and fixtures to CDN
    bash ./scripts/upload-to-cdn.sh

    # Publish to npm
    cd react-dist
    npm publish
else
    echo ""
    echo "Dry run."
    echo "@duffel/components not published."
    echo ""
fi
