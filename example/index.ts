import http from "http";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createRequestListener } from "./lib/createRequestListener.ts";
import { getDuffelHeaders } from "./lib/getDuffelHeaders.ts";
import { getExampleEnvironment } from "./lib/getExampleEnvironment.ts";

const PORT = 3000;
const EXAMPLE_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const loadEnvFile = (
  process as typeof process & { loadEnvFile: (path: string) => void }
).loadEnvFile;

loadEnvFile(path.resolve(EXAMPLE_DIRECTORY, "../.env.local"));

const environment = getExampleEnvironment(EXAMPLE_DIRECTORY);
const duffelHeaders = getDuffelHeaders(environment.duffelApiToken);
const requestListener = createRequestListener({
  duffelHeaders,
  environment,
});

http.createServer(requestListener).listen(PORT);

// eslint-disable-next-line
console.log(`\nServing example on http://localhost:${PORT}`);
