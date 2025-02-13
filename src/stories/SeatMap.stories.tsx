import { SeatMap } from "@components/DuffelAncillaries/seats/SeatMap";
import { SeatMap as SeatMapType } from "@duffel/api/types";
import type { Meta } from "@storybook/react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const SEAT_MAP_FIXTURE: SeatMapType = require("../fixtures/seat-maps/seat_map_with_restricted_seat_general.json");

export default {
  title: "SeatMap",
  component: SeatMap,
  decorators: [
    (Story) => (
      <div className="duffel-components">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default: React.FC = () => (
  <SeatMap
    seatMap={SEAT_MAP_FIXTURE}
    selectedServicesMap={{}}
    onSeatToggled={console.log}
    currentPassengerId={"pax_id_1"}
    currentPassengerName={"艾未未"}
    currentSegmentId={"seg_0000Ar2vnrSIGpJv0j4lWK"}
  />
);
