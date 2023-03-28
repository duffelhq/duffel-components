import http from "http";
import dotenv from "dotenv";
import { readFile, readFileSync, writeFileSync } from "fs";
/**
 * nodejs.org/api/cli.html#node_tls_reject_unauthorizedvalue
 */
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

dotenv.config({ path: ".env.local" });
if (process.env.DUFFEL_API_URL === undefined) {
  throw new Error("process.env.DUFFEL_API_URL is required but missing");
}

if (process.env.DUFFEL_API_TOKEN === undefined) {
  throw new Error("process.env.DUFFEL_API_TOKEN is required but missing");
}

export const makeMockDateInTheFuture = (daysAhead) => {
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

let searchRoundTripOnDuffelResult = null;
const searchRoundTripOnDuffel = async (origin, destination) => {
  if (searchRoundTripOnDuffelResult !== null) {
    return searchRoundTripOnDuffelResult;
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
  searchRoundTripOnDuffelResult = offerRequest;
  return searchRoundTripOnDuffelResult;
};

let getOffersFromDuffelResult = null;
const getOffersFromDuffel = async (offerRequestId) => {
  if (getOffersFromDuffelResult !== null) {
    return getOffersFromDuffelResult;
  }

  const { data: offers } = await (
    await fetch(
      process.env.DUFFEL_API_URL +
        `/air/offers?offer_request_id=${offerRequestId}`,
      {
        headers: duffelHeaders,
      }
    )
  ).json();
  getOffersFromDuffelResult = offers;
  return getOffersFromDuffelResult;
};

const createOrderOnDuffel = async (payload) => {
  const response = await fetch(process.env.DUFFEL_API_URL + "/air/order", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: duffelHeaders,
  });

  return response;
};

const ROUTES = {
  /**
   * @param {http.IncomingMessage} request
   * @param {http.ServerResponse} response
   */
  "/": async function index(request, response) {
    const offerRequest = await searchRoundTripOnDuffel("JFK", "MIA");
    const [offer] = await getOffersFromDuffel(offerRequest.id);

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

    // for convenience
    // TODO: nice to have later, be able to load from these files for local dev
    writeFileSync(
      `./__generated__${offer.id}.json`,
      JSON.stringify(offer, null, 2)
    );

    const template = readFileSync("src/examples/example-1/index.html", {
      encoding: "utf-8",
    });

    const withOfferId = template.replace("__OFFER_ID__", offer.id);
    const withclientKey = withOfferId.replace(
      "__CLIENT_KEY__",
      offer.client_key
    );
    const withPassengers = withclientKey.replace(
      "const passengers = [];",
      `const passengers = ${JSON.stringify(passengers)};\n`
    );

    response.writeHead(200);
    response.end(withPassengers);
  },

  /**
   * @param {http.IncomingMessage} request
   * @param {http.ServerResponse} response
   */
  "/book": async function book(request, response) {
    if (request.method != "POST") {
      response.writeHead(404);
      response.end(http.STATUS_CODES[404]);
    }

    /**
     * @param {Response} createOrderResponse
     */
    const createOrderResponse = await createOrderOnDuffel(request.body);
    response.writeHead(createOrderResponse.status);
    response.pipe(createOrderResponse.body);
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
  .listen(8080);

console.log(`\n🐄 Serving example on http://localhost:8080`);
console.log(`  ↳ ok`);
