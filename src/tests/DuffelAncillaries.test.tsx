import { DuffelAncillaries } from "@components/DuffelAncillaries";
import { describe, expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import React from "react";

const ExampleWithEmptyServices: React.FC = () => (
  <DuffelAncillaries
    onPayloadReady={jest.fn()}
    passengers={[]}
    services={[]}
    offer_id="offer_id"
    client_key="client_key"
  />
);

describe("DuffelAncillaries", () => {
  test("should throw an error when services is empty", () => {
    expect(() => render(<ExampleWithEmptyServices />)).toThrow(
      'You must provide at least one service in the "services" prop. Valid services: ["bags", "seats"]'
    );
  });
});
