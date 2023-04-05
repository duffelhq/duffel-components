import { readFileSync } from "fs";
import http from "http";

const ROUTES = {
  "/": async function index(request, response) {
    const template = readFileSync(
      "src/examples/client-side-example/index.html",
      {
        encoding: "utf-8",
      }
    );
    response.writeHead(200);
    response.end(template);
  },
};

http
  .createServer(function (request, response) {
    if (request.url in ROUTES) {
      return ROUTES[request.url](request, response);
    }

    response.writeHead(404);
    response.end(http.STATUS_CODES[404]);
  })
  .listen(6262);

console.log(`\n🐄 Serving example on http://localhost:6262`);
console.log(
  `  ↳ To inspect component data include hash: '#inspect-duffel-checkout'`
);
