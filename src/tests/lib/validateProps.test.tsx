/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * In this file, we want to allow usage of @ts-ignore so
 * that we can test functions with invalid props.
 */

import { hasCommonRequiredProps } from "@lib/validateProps";
import { Ancillaries } from "../../types/DuffelAncillariesProps";

describe("hasCommonRequiredProps", () => {
  it("should pass when all required props are provided", () => {
    const props = {
      onPayloadReady: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
      passengers: [],
      services: ["bags"] as Ancillaries[],
      offer_id: "offer_id",
      client_key: "client_key",
    };
    expect(hasCommonRequiredProps(props)).toBeTruthy();
  });

  it("should fail when services is missing", () => {
    const props = {
      onPayloadReady: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
      passengers: [],
      offer_id: "offer_id",
      client_key: "client_key",
    };

    // @ts-ignore
    expect(hasCommonRequiredProps(props)).toBeFalsy();
  });

  it("should fail when onPayloadReady is missing", () => {
    const props = {
      passengers: [],
      services: ["bags"] as Ancillaries[],
      offer_id: "offer_id",
      client_key: "client_key",
    };

    // @ts-ignore
    expect(hasCommonRequiredProps(props)).toBeFalsy();
  });

  it("should fail when passengers is missing", () => {
    const props = {
      onPayloadReady: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
      services: ["bags"] as Ancillaries[],
      offer_id: "offer_id",
      client_key: "client_key",
    };

    // @ts-ignore
    expect(hasCommonRequiredProps(props)).toBeFalsy();
  });
});
