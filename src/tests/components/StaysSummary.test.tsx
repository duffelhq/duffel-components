import { render, screen } from "@testing-library/react";
import { StaysAccommodation } from "@duffel/api/types";
import { StaysSummary } from "../../components/Stays/StaysSummary";

/* eslint-disable @typescript-eslint/no-var-requires */
const accommodation: StaysAccommodation = require("../../fixtures/accommodation/acc_0000AWr2VsUNIF1Vl91xg0.json");
/* eslint-enable @typescript-eslint/no-var-requires */

describe("StaysSummary", () => {
  test("shows years for check-in and check-out dates", () => {
    render(
      <StaysSummary
        accommodation={accommodation}
        checkInDate={new Date("2023-04-28")}
        checkOutDate={new Date("2023-05-04")}
      />,
    );

    expect(screen.getByText("Fri 28 Apr 2023")).toBeTruthy();
    expect(screen.getByText("Thu 4 May 2023")).toBeTruthy();
  });
});
