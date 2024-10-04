import https from "https";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFile } from "fs/promises";
import dotenv from "dotenv";
import { readFileSync } from "fs";
const __dirname = dirname(fileURLToPath(import.meta.url));

// ====== Constants ======
const EXAMPLES = {
  duffel_airways: ["STN", "GDN", "duffel_airways"],
  british_airways: ["LHR", "ABZ", "british_airways"],
};

dotenv.config({ path: resolve(__dirname, "../../.env.local") });
// ====== Check environment variables ======
if (process.env.DUFFEL_API_URL === undefined) {
  throw new Error(
    "process.env.DUFFEL_API_URL is required to run this example but one is not present in the environment.\n Make sure to include one in you `.env.local`\n",
  );
}

if (process.env.TOKEN_PROXY_URL === undefined) {
  throw new Error(
    "process.env.TOKEN_PROXY_URL is required to run this example but one is not present in the environment.\n Make sure to include one in you `.env.local`\n",
  );
}

if (process.env.DUFFEL_API_TOKEN === undefined) {
  throw new Error(
    "process.env.DUFFEL_API_TOKEN is required to run this example but one is not present in the environment.\n Make sure to include one in you `.env.local`\n",
  );
}

if (process.env.DUFFEL_API_URL === "https://localhost:4000") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// ====== API client helpers ======
const API_HEADERS = {
  "Duffel-Version": "v2",
  "Accept-Encoding": "gzip",
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.DUFFEL_API_TOKEN}`,
};

const makeMockDateInTheFuture = (daysAhead) => {
  const now = new Date(Date.now());
  now.setDate(now.getDate() + daysAhead);
  return now;
};

// ====== API calls ======
async function createComponentClientKey() {
  const response = await fetch(
    `${process.env.DUFFEL_API_URL}/identity/component_client_keys`,
    {
      method: "POST",
      headers: API_HEADERS,
    },
  );

  const { data } = await response.json();
  return data.component_client_key;
}

async function createCard() {
  const response = await fetch(`${process.env.TOKEN_PROXY_URL}/vault/cards`, {
    method: "POST",
    headers: API_HEADERS,
    body: JSON.stringify({
      data: {
        number: "4111110148486405", // BA: 4263970000005262
        expiry_month: "12",
        expiry_year: (new Date().getFullYear() + 1).toString().slice(2),
        cvc: "123",
        name: "Mae Jemison",
        address_line_1: "123 Main St",
        address_city: "Dallas",
        address_region: "TX",
        address_postal_code: "75201",
        address_country_code: "US",
        multi_use: false,
      },
    }),
  });

  const { data } = await response.json();
  return data.id;
}

async function getOffer(origin, destination, source) {
  const response = await fetch(
    process.env.DUFFEL_API_URL + "/air/offer_requests?return_offers=true",
    {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
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
          requested_sources: [source],
        },
      }),
    },
  );

  const { data: offerRequest } = await response.json();
  console.info(`Got ${offerRequest.offers.length} offers`);
  return offerRequest.offers[0];
}

async function createOrder(
  offerID,
  offerAmount,
  threeDSSessionID,
  passengerID,
) {
  const response = await fetch(process.env.DUFFEL_API_URL + "/air/orders", {
    method: "POST",
    headers: API_HEADERS,
    body: JSON.stringify({
      data: {
        type: "instant",
        services: [],
        selected_offers: [offerID],
        payments: [
          {
            type: "card",
            currency: "GBP",
            amount: offerAmount,
            three_d_secure_session_id: threeDSSessionID,
          },
        ],
        passengers: [
          {
            id: passengerID,
            title: "mrs",
            phone_number: "+442080160509",
            given_name: "Amelia",
            gender: "f",
            family_name: "Earhart",
            email: "amelia@duffel.com",
            born_on: "1987-07-24",
          },
        ],
      },
    }),
  });

  const { data } = await response.json();
  return data;
}

// ====== Get template file ======
const HTML_FILE_PATH = resolve(__dirname, "./index.html");
async function getHTML() {
  return await readFile(HTML_FILE_PATH, {
    encoding: "utf-8",
  });
}

// ====== Define routes ======
function endpoint(workFunction) {
  return async function (request, response) {
    try {
      await workFunction(request, response);
    } catch (error) {
      console.error(error);
      response.writeHead(500);
      response.end(error.message);
    }
  };
}

const SERVER_ROUTES = {
  "/": endpoint(async function (_, response) {
    const offer = await getOffer(...EXAMPLES.duffel_airways);
    const componentClientKey = await createComponentClientKey();
    const cardID = await createCard(componentClientKey);

    const template = await getHTML();

    const templateWithValues = template
      .replace(/__COMPONENT_CLIENT_KEY__/g, componentClientKey)
      .replace(/__OFFER_ID__/g, offer.id)
      .replace(/__OFFER_AMOUNT__/g, offer.total_amount)
      .replace(/__CARD_ID__/g, cardID)
      .replace(/__PASSENGER_ID__/g, offer.passengers[0].id);

    response.writeHead(200);
    response.end(templateWithValues);
  }),
  "/create-order": endpoint(async function (request, response) {
    if (request.method === "POST") {
      let data = "";
      request.on("data", (chunk) => {
        data += chunk;
      });
      request.on("end", async () => {
        const { offerID, offerAmount, threeDSSessionID, passengerID } =
          JSON.parse(data);

        const order = await createOrder(
          offerID,
          offerAmount,
          threeDSSessionID,
          passengerID,
        );

        console.info("Order created:", order);
        response.writeHead(201);
        response.end({ orderID: order.id });
      });
    } else {
      response.writeHead(404);
    }
  }),
};

const PORT = 3000;
https
  .createServer(
    {
      key: readFileSync(resolve(__dirname, "../../.local-ssl/components.key")),
      cert: readFileSync(
        resolve(__dirname, "../../.local-ssl/components.cert"),
      ),
    },
    function (request, response) {
      if (request.url in SERVER_ROUTES) {
        return SERVER_ROUTES[request.url](request, response);
      }

      console.warn("Attempted to load unknown route:", request.url);
      response.writeHead(404).end();
    },
  )
  .listen(PORT);

console.log(`\nServing example on https://localhost:${PORT}`);
