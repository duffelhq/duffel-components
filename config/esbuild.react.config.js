/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require("esbuild");
const dotenv = require("dotenv");
const { sentryEsbuildPlugin } = require("@sentry/esbuild-plugin");

dotenv.config({ path: ".env.build" });

const VERSION = require("../package.json").version;
const envVariablesToDefine = {
  "process.env.COMPONENT_VERSION": `"${VERSION}"`,
  "process.env.DUFFEL_API_URL": `"${process.env.DUFFEL_API_URL}"`,
  "process.env.COMPONENT_CDN": `"${
    process.env.COMPONENT_CDN.startsWith("http://localhost:")
      ? process.env.COMPONENT_CDN
      : `${process.env.COMPONENT_CDN}/${VERSION}`
  }"`,
};

// Builds for react environment
esbuild
  .build({
    define: envVariablesToDefine,
    entryPoints: ["src/index.ts", "src/custom-elements.ts"],
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: "react-dist",
    format: "cjs",
    external: ["react", "react-dom"],
    plugins: [
      // Learn more on https://www.npmjs.com/package/@sentry/esbuild-plugin
      sentryEsbuildPlugin({
        org: "duffel",
        project: "ancillaries-component",
        include: `./react-dist`,
        authToken: process.env.SENTRY_AUTH_TOKEN,
        logLevel: "info",
        release: `react-${VERSION}`,
      }),
    ],
  })
  .catch(() => process.exit(1));
