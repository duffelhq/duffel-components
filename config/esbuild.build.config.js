/* eslint-disable @typescript-eslint/no-var-requires */
const { sentryEsbuildPlugin } = require("@sentry/esbuild-plugin");
const esbuild = require("esbuild");
const dotenv = require("dotenv");
const esbuildCopyStaticFiles = require("esbuild-copy-static-files");

(async function () {
  dotenv.config({ path: ".env.build" });

  let COMPONENT_CDN = process.env.COMPONENT_CDN;
  if (!process.env.COMPONENT_CDN.startsWith("http://localhost:")) {
    COMPONENT_CDN += "/" + require("../package.json").version;
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
