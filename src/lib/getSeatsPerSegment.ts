import { OfferSliceSegment } from "src/types/Offer";
import { SeatSelectionContextInterface } from "./useSeatSelectionContext";

export type SeatPerSegmentsProps = Record<string, string[]>;

export const getSeatsPerSegment = (
  currentSelectedSegment: OfferSliceSegment,
  seatSelection: SeatSelectionContextInterface
): SeatPerSegmentsProps => {
  const seatsPerSegment = Object.keys(seatSelection).reduce(
    (memo: SeatPerSegmentsProps, segment) => {
      const currentPassenger = currentSelectedSegment.passengers;
      if (currentPassenger) {
        if (currentPassenger.length > 0) {
          const passengers: string[] = [];
          currentPassenger.forEach((passenger) => {
            passengers.push(passenger.passenger_id);
          });
          memo = {
            ...memo,
            [segment]: passengers.sort((a, b) => a.localeCompare(b)),
          };
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [segment]: _, ...rest } = memo;
          return rest;
        }
      }

      return memo;
    },
    {}
  );

  return seatsPerSegment;
};
