/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const DUFFEL_API_URL = process.env.DUFFEL_API_URL;
const VERSION = require("../package.json").version;

const COMPONENT_CDN = process.env.COMPONENT_CDN.startsWith("http://localhost:")
  ? process.env.COMPONENT_CDN
  : join(process.env.COMPONENT_CDN, VERSION);

module.exports = {
  define: {
    "process.env.COMPONENT_CDN": `"${COMPONENT_CDN}"`,
    "process.env.DUFFEL_API_URL": `"${DUFFEL_API_URL}"`,
    "process.env.COMPONENT_VERSION": `"${VERSION}"`,
  },
  entryPoints: [
    "src/components/DuffelAncillariesCustomElement.tsx",
    "src/styles/global.css",
  ],
  bundle: true,
  outdir: "dist",
  minify: true,
  treeShaking: true,
  sourcemap: true,
};
