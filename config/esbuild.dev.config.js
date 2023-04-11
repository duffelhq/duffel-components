/* eslint-disable @typescript-eslint/no-var-requires */

const { sentryEsbuildPlugin } = require("@sentry/esbuild-plugin");
const esbuild = require("esbuild");
const dotenv = require("dotenv");
const copyStaticFiles = require("esbuild-copy-static-files");

(async function () {
  // The most recent version of this file is here:
  // https://start.1password.com/open/i?a=CVTLLVSJJJC4RG7PJTMOY5VCXE&h=duffel.1password.com&i=gd6refyn462lhbfktupebggn6e&v=kmjm74mssgamftm75gcbdhw66q
  dotenv.config({ path: ".env.local" });

  const esbuildContext = await esbuild.context({
    entryPoints: [
      "src/components/DuffelCheckoutCustomElement.tsx",
      "src/styles/global.css",
    ],
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
      copyStaticFiles({
        src: "src/lib/mocks/saved",
        dest: "dist/mocks",
        dereference: true,
        recursive: true,
      }),
    ],
  });

  let { host, port } = await esbuildContext.serve({
    servedir: "dist",
    port: 8000,
  });
  if (host == "0.0.0.0") {
    host = "localhost";
  }
  const prefix = `http://${host}:${port}`;

  console.log(`\n🐄 Serving component on ${prefix}`);
  console.log(`  ↳ ${prefix}/components/DuffelCheckoutCustomElement.js`);
  console.log(`  ↳ ${prefix}/components/DuffelCheckoutCustomElement.js.map`);
  console.log(`  ↳ ${prefix}/styles/global.css`);
  console.log(`  ↳ ${prefix}/styles/global.css.map\n`);

  await esbuildContext.watch();
})();
