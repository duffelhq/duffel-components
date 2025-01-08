import { ThreeDSecureSession } from "../../functions/createThreeDSecureSession/client";
import { createThreeDSecureSession } from "../../functions/createThreeDSecureSession/createThreeDSecureSession";

jest.mock(
  "../../functions/createThreeDSecureSession/loadEvervaultScript",
  () => {
    return {
      loadEvervaultScript: jest.fn(),
    };
  },
);

const mockOn = jest.fn();
jest.mock("../../functions/createThreeDSecureSession/initEvervault", () => {
  return {
    initEvervault: () => {
      return {
        on: mockOn,
      };
    },
  };
});

const clientKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const tokenisedCardId = "tcd_123";
const services = new Array<{ id: string; quantity: number }>();
const cardholderPresent = true;

const MOCK_RESPONSE: Partial<ThreeDSecureSession> = {
  live_mode: false,
  client_id: "evervault_external_id",
};

const RESOURCE_ID_TO_STATUS_MAP = {
  off_readyforpayment: "ready_for_payment",
  off_challengerequired: "client_action_required",
  off_failed: "client_action_required",
  off_apierror: "failed",
  off_apierrorforrefresh: "client_action_required",
};

const RESOURCE_ID_TO_SESSION_ID_MAP = {
  off_readyforpayment: "tds_123",
  off_challengerequired: "tds_123",
  off_failed: "tds_fail",
  off_apierrorforrefresh: "tds_failrefresh",
};

const SESSION_ID_TO_STATUS_MAP = {
  tds_123: "ready_for_payment",
  tds_fail: "failed",
  tds_failrefresh: "failed",
};

const MOCK_ERROR = {
  code: "internal_server_error",
  detail: "Internal server error",
  source: { pointer: "/data" },
  status: "500",
  title: "Internal server error",
};

const mockFetch = jest.fn((url, { body: bodyString }) => {
  if (url == "https://api.duffel.com/three_d_secure_sessions") {
    const { data: body } = JSON.parse(bodyString);
    if (!(body.resource_id in RESOURCE_ID_TO_STATUS_MAP)) {
      throw new Error(
        "Invalid resource_id, it must be one of the keys in RESOURCE_ID_TO_STATUS_MAP",
      );
    }
    if (body.resource_id === "off_apierror") {
      return Promise.resolve({
        status: 500,
        json: () =>
          Promise.reject({
            errors: [MOCK_ERROR],
            meta: { request_id: "123" },
          }),
      });
    }

    return Promise.resolve({
      status: 201,
      json: () =>
        Promise.resolve({
          data: {
            ...MOCK_RESPONSE,
            id: RESOURCE_ID_TO_SESSION_ID_MAP[
              body.resource_id as keyof typeof RESOURCE_ID_TO_SESSION_ID_MAP
            ],
            resource_id: body.resource_id,
            status:
              RESOURCE_ID_TO_STATUS_MAP[
                body.resource_id as keyof typeof RESOURCE_ID_TO_STATUS_MAP
              ],
          },
        }),
    });
  } else if (
    url.startsWith("https://api.duffel.com/three_d_secure_sessions/") &&
    url.endsWith("/actions/refresh")
  ) {
    const sessionId = url.match(/three_d_secure_sessions\/(.*)\/actions/)[1];
    if (!(sessionId in SESSION_ID_TO_STATUS_MAP)) {
      throw new Error(
        "Invalid session_id, it must be one of the keys in SESSION_ID_TO_STATUS_MAP",
      );
    }

    if (sessionId === "tds_failrefresh") {
      return Promise.resolve({
        status: 500,
        json: () =>
          Promise.reject({
            errors: [
              {
                ...MOCK_ERROR,
                detail: "Internal server error when refreshing",
              },
            ],
            meta: {
              request_id: "123",
            },
          }),
      });
    }

    return Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          data: {
            ...MOCK_RESPONSE,
            id: sessionId,
            resource_id: "off_" + sessionId,
            status:
              SESSION_ID_TO_STATUS_MAP[
                sessionId as keyof typeof SESSION_ID_TO_STATUS_MAP
              ],
          },
        }),
    });
  } else {
    throw new Error("Attempted to fetch an unexpected URL");
  }
});
global.fetch = mockFetch as any;

describe("createThreeDSecureSession", () => {
  beforeEach(() => {
    mockOn.mockClear();
  });

  it("successfully returns 3DS session without challenge", async () => {
    const result = await createThreeDSecureSession(
      clientKey,
      tokenisedCardId,
      "off_readyforpayment",
      services,
      cardholderPresent,
    );

    expect(result.status).toEqual("ready_for_payment");
  });

  it("successfully returns 3DS session without challenge when passing exception", async () => {
    const result = await createThreeDSecureSession(
      clientKey,
      tokenisedCardId,
      "off_readyforpayment",
      services,
      cardholderPresent,
      "secure_corporate_payment",
    );

    expect(result.status).toEqual("ready_for_payment");
  });

  it("successfully returns 3DS session with challenge", async () => {
    setTimeout(() => {
      const callback = mockOn.mock.calls.find(
        (call) => call[0] === "success",
      )[1];
      callback();
    });

    const result = await createThreeDSecureSession(
      clientKey,
      tokenisedCardId,
      "off_challengerequired",
      services,
      cardholderPresent,
    );

    expect(result.status).toEqual("ready_for_payment");
  });

  it("returns failed 3DS session when user failed the 3DS challenge", async () => {
    setTimeout(() => {
      const callback = mockOn.mock.calls.find(
        (call) => call[0] === "failure",
      )[1];
      callback();
    });

    try {
      await createThreeDSecureSession(
        clientKey,
        tokenisedCardId,
        "off_failed",
        services,
        cardholderPresent,
      );
    } catch (failed) {
      expect(failed).toEqual({
        client_id: "evervault_external_id",
        id: "tds_fail",
        live_mode: false,
        resource_id: "off_tds_fail",
        status: "failed",
      });
    }
  });

  it("returns generic error message when 3DS challenge encountered an error", async () => {
    setTimeout(() => {
      const callback = mockOn.mock.calls.find((call) => call[0] === "error")[1];
      callback();
    });

    try {
      await createThreeDSecureSession(
        clientKey,
        tokenisedCardId,
        "off_failed",
        services,
        cardholderPresent,
      );
    } catch (failed) {
      expect(failed).toEqual(new Error("Failed to create 3DS session"));
    }
  });

  it("returns API error when creating the 3DS session fails", async () => {
    try {
      await createThreeDSecureSession(
        clientKey,
        tokenisedCardId,
        "off_apierror",
        services,
        cardholderPresent,
      );
    } catch (failed) {
      expect(failed).toEqual({
        errors: [MOCK_ERROR],
        meta: {
          request_id: "123",
        },
      });
    }
  });

  it("returns API error when refreshing the 3DS session fails", async () => {
    setTimeout(() => {
      const callback = mockOn.mock.calls.find(
        (call) => call[0] === "success",
      )[1];
      callback();
    });

    try {
      await createThreeDSecureSession(
        clientKey,
        tokenisedCardId,
        "off_apierrorforrefresh",
        services,
        cardholderPresent,
      );
    } catch (failed) {
      expect(failed).toEqual({
        errors: [
          {
            ...MOCK_ERROR,
            detail: "Internal server error when refreshing",
          },
        ],
        meta: {
          request_id: "123",
        },
      });
    }
  });
});
