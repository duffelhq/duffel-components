/* eslint-disable @typescript-eslint/no-var-requires */
const { sentryEsbuildPlugin } = require("@sentry/esbuild-plugin");
const esbuild = require("esbuild");
const dotenv = require("dotenv");
const esbuildCopyStaticFiles = require("esbuild-copy-static-files");
const VERSION = require("../package.json").version;

(async function () {
  dotenv.config({ path: ".env.build" });

  const DUFFEL_API_URL = process.env.DUFFEL_API_URL;
  let COMPONENT_CDN = process.env.COMPONENT_CDN;
  if (!process.env.COMPONENT_CDN.startsWith("http://localhost:")) {
    COMPONENT_CDN += "/" + VERSION;
  }

  if (process.env.SENTRY_AUTH_TOKEN === undefined) {
    throw new Error("process.env.SENTRY_AUTH_TOKEN is required but missing");
  }

  await esbuild.build({
    entryPoints: [
      "src/components/DuffelCheckoutCustomElement.tsx",
      "src/styles/global.css",
    ],
    bundle: true,
    outdir: "dist",
    minify: true,
    treeShaking: true,
    sourcemap: true,
    define: {
      "process.env.COMPONENT_CDN": `"${COMPONENT_CDN}"`,
      "process.env.DUFFEL_API_URL": `"${DUFFEL_API_URL}"`,
      "process.env.COMPONENT_VERSION": `"${VERSION}"`,
      DUFFEL_API_URL,
    },
    plugins: [
      sentryEsbuildPlugin({
        org: "duffel",
        project: "ancillaries-component",
        // Specify the directory containing build artifacts
        include: "./dist",
        authToken: process.env.SENTRY_AUTH_TOKEN,
        logLevel: "info",
      }),
      esbuildCopyStaticFiles({
        src: "src/fixtures",
        dest: "dist/fixtures",
        dereference: true,
        recursive: true,
      }),
    ],
  });
})();
