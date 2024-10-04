/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require("esbuild");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const DUFFEL_API_URL = process.env.DUFFEL_API_URL;
const VERSION = require("../package.json").version;

const PORT = 3200;
const COMPONENT_CDN = `https://localhost:${PORT}`;

(async function () {
  const esbuildContext = await esbuild.context({
    ...require("./esbuild.base.config"),
    // The `define` config will replace the values in the code with the ones we specify below.
    // This is needed since the component will be used in the browser,
    // where we don't have access to environment variables.
    define: {
      "process.env.COMPONENT_CDN": `"${COMPONENT_CDN}"`,
      "process.env.DUFFEL_API_URL": `"${DUFFEL_API_URL}"`,
      "process.env.COMPONENT_VERSION": `"${VERSION}"`,
    },
    plugins: [
      // This plugin copies the offer and seat maps fixtures to the dist folder.
      // When using the component with an offer id prefixed with `fixture_`
      // the component will attempt to fetch it from the hosted folder.
      require("esbuild-copy-static-files")({
        src: "src/fixtures",
        dest: "cdn-dist/fixtures",
        dereference: true,
        recursive: true,
      }),
    ],
  });

  let { host, port } = await esbuildContext.serve({
    host: "localhost",
    servedir: "cdn-dist",
    port: PORT,
    keyfile: ".local-ssl/components.key",
    certfile: ".local-ssl/components.cert",
  });
  await esbuildContext.watch();

  // eslint-disable-next-line
  console.log(`\n🐄 Serving component on https://${host}:${port}`);
})();
