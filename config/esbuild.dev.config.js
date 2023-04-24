/* eslint-disable @typescript-eslint/no-var-requires */

const { sentryEsbuildPlugin } = require("@sentry/esbuild-plugin");
const esbuild = require("esbuild");
const copyStaticFiles = require("esbuild-copy-static-files");

(async function () {
  const esbuildContext = await esbuild.context({
    ...require("./esbuild.base.config"),
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
        src: "src/fixtures",
        dest: "dist/fixtures",
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
  console.log(`  ↳ ${prefix}/ancillaries-components/index.js`);
  console.log(`  ↳ ${prefix}/ancillaries-components/index.map`);
  console.log(`  ↳ ${prefix}/ancillaries-components/styles/global.css`);
  console.log(`  ↳ ${prefix}/ancillaries-components/styles/global.css.map`);
  console.log(`  ↳ ${prefix}/fixtures\n`);

  await esbuildContext.watch();
})();
