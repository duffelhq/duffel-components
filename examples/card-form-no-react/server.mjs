import http from "http";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFile } from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.DUFFEL_API_URL === undefined) {
  throw new Error(
    "process.env.DUFFEL_API_URL is required to run this example but one is not present in the environment.\n Make sure to include one in you `.env.local`\n"
  );
}

if (process.env.DUFFEL_API_TOKEN === undefined) {
  throw new Error(
    "process.env.DUFFEL_API_URL is required to run this example but one is not present in the environment.\n Make sure to include one in you `.env.local`\n"
  );
}

if (process.env.DUFFEL_API_URL === "https://localhost:4000") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const HTML_FILE_PATH = resolve(__dirname, "./index.html");

async function getComponentClientKey() {
  const response = await fetch(
    `${process.env.DUFFEL_API_URL}/identity/component_client_keys`,
    {
      method: "POST",
      headers: {
        "Duffel-Version": "v1",
        "Accept-Encoding": "gzip",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DUFFEL_API_TOKEN}`,
      },
    }
  );

  const { data } = await response.json();
  return data.component_client_key;
}

async function getHTML() {
  return await readFile(HTML_FILE_PATH, {
    encoding: "utf-8",
  });
}

const SERVER_ROUTES = {
  "/": async function (_request, response) {
    try {
      const componentClientKey = await getComponentClientKey();
      const template = await getHTML();

      response.writeHead(200);
      response.end(
        template.replace("__COMPONENT_CLIENT_KEY__", componentClientKey)
      );
    } catch (error) {
      console.error(error);
      response.writeHead(500);
      response.end(error.message);
    }
  },
};

const PORT = 3000;
http
  .createServer(function (request, response) {
    if (request.url in SERVER_ROUTES) {
      return SERVER_ROUTES[request.url](request, response);
    }

    response.writeHead(404);
    response.end(http.STATUS_CODES[404]);
  })
  .listen(PORT);

console.log(`\nServing example on http://localhost:${PORT}`);
