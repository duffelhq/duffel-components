/* eslint-disable @typescript-eslint/no-var-requires */
const { sentryEsbuildPlugin } = require("@sentry/esbuild-plugin");
const esbuild = require("esbuild");
const dotenv = require("dotenv");
const esbuildCopyStaticFiles = require("esbuild-copy-static-files");

dotenv.config({ path: ".env.build" });
if (process.env.SENTRY_AUTH_TOKEN === undefined) {
  // eslint-disable-next-line
  console.error(
    "'process.env.SENTRY_AUTH_TOKEN' is required but missing." +
      "Make sure it's included in your .env.build file.",
  );
  process.exit(1);
}

const VERSION = require("../package.json").version;
const envVariablesToDefine = {
  "process.env.COMPONENT_VERSION": `"${VERSION}"`,
  "process.env.DUFFEL_API_URL": `"${process.env.DUFFEL_API_URL}"`,
  "process.env.COMPONENT_CDN": process.env.COMPONENT_CDN.startsWith(
    "http://localhost:",
  )
    ? `"${process.env.COMPONENT_CDN}"`
    : `"${process.env.COMPONENT_CDN}/${VERSION}"`,
};

esbuild
  .build({
    ...require("./esbuild.base.config"),
    define: envVariablesToDefine,
    plugins: [
      // Learn more on https://www.npmjs.com/package/@sentry/esbuild-plugin
      sentryEsbuildPlugin({
        org: "duffel",
        project: "ancillaries-component",
        // Specify the directory containing build artifacts
        include: "./cdn-dist",
        authToken: process.env.SENTRY_AUTH_TOKEN,
        logLevel: "info",
        release: VERSION,
      }),
      esbuildCopyStaticFiles({
        src: "src/fixtures",
        dest: "cdn-dist/fixtures",
        dereference: true,
        recursive: true,
      }),
    ],
  })
  .catch(() => process.exit(1));
