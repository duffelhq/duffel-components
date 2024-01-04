import { readFileSync } from "fs";
import http from "http";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const PORT = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML_FILE_PATH = path.resolve(__dirname, "./index.html");

if (process.env.DUFFEL_API_URL === undefined) {
  throw new Error("process.env.DUFFEL_API_URL is required but missing");
}

if (process.env.DUFFEL_API_TOKEN === undefined) {
  throw new Error("process.env.DUFFEL_API_TOKEN is required but missing");
}

const makeMockDateInTheFuture = (daysAhead) => {
  const now = new Date(Date.now());
  now.setDate(now.getDate() + daysAhead);
  return now;
};

const duffelHeaders = {
  "Duffel-Version": "v1",
  "Accept-Encoding": "gzip",
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.DUFFEL_API_TOKEN}`,
};

let searchRoundTripOnDuffelResultCache = null;
async function searchRoundTripOnDuffel(origin, destination) {
  if (searchRoundTripOnDuffelResultCache !== null) {
    return searchRoundTripOnDuffelResultCache;
  }

  const payload = {
    data: {
      slices: [
        {
          origin,
          destination,
          departure_date: makeMockDateInTheFuture(7)
            .toISOString()
            .split("T")[0],
        },
        {
          origin: destination,
          destination: origin,
          departure_date: makeMockDateInTheFuture(14)
            .toISOString()
            .split("T")[0],
        },
      ],
      passengers: [{ type: "adult" }],
      requested_sources: ["duffel_airways"],
    },
  };

  const { data: offerRequest } = await (
    await fetch(
      process.env.DUFFEL_API_URL + "/air/offer_requests?return_offers=true",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: duffelHeaders,
      }
    )
  ).json();

  searchRoundTripOnDuffelResultCache = offerRequest;
  return searchRoundTripOnDuffelResultCache;
}

async function createOrderOnDuffel(request, response) {
  const createOrderOnDuffelResponse = await fetch(
    process.env.DUFFEL_API_URL + "/air/orders",
    {
      method: "POST",
      headers: duffelHeaders,
      body: request,
      duplex: "half",
    }
  );

  response.writeHead(createOrderOnDuffelResponse.status, {
    "Content-type": "application/json",
  });
  response.write(await createOrderOnDuffelResponse.text());
  response.end();
}

const SERVER_ROUTES = {
  "/": async function index(request, response) {
    const offerRequest = await searchRoundTripOnDuffel("JFK", "MIA");
    const offer = offerRequest.offers[0];

    if (!offer) {
      response.writeHead(404);
      response.end(http.STATUS_CODES[404]);
      return;
    }

    const passengers = [
      {
        id: offer.passengers[0].id,
        given_name: "Mae",
        family_name: "Jemison",
        gender: "F",
        title: "dr",
        born_on: "1956-10-17",
        email: "m.jemison@nasa.gov",
        phone_number: "+16177562626",
      },
    ];

    const template = readFileSync(HTML_FILE_PATH, {
      encoding: "utf-8",
    });

    const withOfferId = template.replace("__OFFER_ID__", offer.id);
    const withclientKey = withOfferId.replace(
      "__CLIENT_KEY__",
      offerRequest.client_key
    );
    const withPassengers = withclientKey.replace(
      `"__PASSENGERS__"`,
      `${JSON.stringify(passengers)}`
    );

    response.writeHead(200);
    response.end(withPassengers);
  },
  "/book": async function book(request, response) {
    if (request.method != "POST") {
      response.writeHead(404);
      response.end(http.STATUS_CODES[404]);
      return;
    }

    await createOrderOnDuffel(request, response);
  },
};

http
  .createServer(function (request, response) {
    if (request.url in SERVER_ROUTES) {
      return SERVER_ROUTES[request.url](request, response);
    }

    response.writeHead(404);
    response.end(http.STATUS_CODES[404]);
  })
  .listen(PORT);

// eslint-disable-next-line
console.log(`\nServing example on http://localhost:${PORT}`);
