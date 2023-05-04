/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * In this file, we want to allow usage of @ts-ignore so
 * that we can test functions with invalid props.
 */

import { render } from "@testing-library/react";
import { DuffelAncillaries } from "@components/DuffelAncillaries";

describe("DuffelAncillaries", () => {
  it("should throw an error when services is empty", () => {
    // Suppress console.error messages as we're purposefully testing for it.
    jest.spyOn(console, "error").mockImplementation(jest.fn);
    expect(() => {
      render(
        <DuffelAncillaries
          onPayloadReady={() => {}} // eslint-disable-line @typescript-eslint/no-empty-function
          passengers={[]}
          services={[]}
          offer_id="offer_id"
          client_key="client_key"
        />
      );
    }).toThrowError();
  });
});
