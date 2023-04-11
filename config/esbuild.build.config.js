/* eslint-disable @typescript-eslint/no-var-requires */
const { sentryEsbuildPlugin } = require("@sentry/esbuild-plugin");
const esbuild = require("esbuild");
const dotenv = require("dotenv");
const esbuildCopyStaticFiles = require("esbuild-copy-static-files");

(async function () {
  dotenv.config({ path: ".env.build" });

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
        src: "src/lib/mocks/saved",
        dest: "dist/mocks",
        dereference: true,
        recursive: true,
      }),
    ],
  });
})();
