const { sentryEsbuildPlugin } = require("@sentry/esbuild-plugin");
const esbuild = require("esbuild");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const EXAMPLES_FOLDER = "./src/examples";

(async function () {
  // The most recent version of this file is here:
  // https://start.1password.com/open/i?a=CVTLLVSJJJC4RG7PJTMOY5VCXE&h=duffel.1password.com&i=gd6refyn462lhbfktupebggn6e&v=kmjm74mssgamftm75gcbdhw66q
  dotenv.config({ path: ".env.local" });

  const esbuildContext = await esbuild.context({
    entryPoints: ["src/component/index.tsx"],
    bundle: true,
    outdir: "dist",
    minify: true,
    treeShaking: true,
    sourcemap: true,
    // target: ["chrome58", "firefox57", "safari11", "edge16"],
    plugins: [
      ...(process.env.SENTRY_AUTH_TOKEN
        ? [
            sentryEsbuildPlugin({
              org: "duffel",
              project: "ancillaries-component",

              // Specify the directory containing build artifacts
              include: "./dist",

              // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
              // and need `project:releases` and `org:read` scopes
              authToken: process.env.SENTRY_AUTH_TOKEN,

              logLevel: "info",
            }),
          ]
        : []),
    ],
  });

  let { host, port } = await esbuildContext.serve({
    servedir: "dist",
    port: 8000,
  });
  console.log(`\n🐄 Listening on http://${host}:${port}`);
  console.log(`  ↳ http://${host}:${port}/index.js`);
  console.log(`  ↳ http://${host}:${port}/index.js.map\n`);

  console.log("Checkout the examples:");
  fs.readdirSync(EXAMPLES_FOLDER).forEach((filePath) =>
    console.log(`  ↳ file://${path.join(__dirname, EXAMPLES_FOLDER, filePath)}`)
  );

  await esbuildContext.watch();
})();
