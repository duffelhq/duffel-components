import {
  SeatInformation,
  SeatSelectionContextInterface,
  SeatSelectionForSegment,
} from "@lib/useSeatSelectionContext";
import { CreateOrderPayloadServices } from "src/types/CreateOrderPayload";

export const getServicesfromSeatSelectionContextInterface = (
  seatSelectionContextInterface: SeatSelectionContextInterface
): CreateOrderPayloadServices => {
  const seatServiceEntries: SeatSelectionForSegment[] = Object.entries(
    seatSelectionContextInterface
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ).map(([_, seat]) => seat);

  const seatInfoEntries: SeatInformation[] = seatServiceEntries.reduce(
    (previous, seat) => {
      const seatInformation = Object.entries(seat || [])
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(([_, seatInfo]) => seatInfo)
        .filter((seatInfo) => seatInfo !== null) as SeatInformation[];
      // using `as SeatInformation[]` because the filter above removes the nulls, but TS doesn't know that

      return [...previous, ...seatInformation];
    },
    [] as SeatInformation[]
  );

  const seatServicesArray = seatInfoEntries.reduce(
    (previous, seat) => [
      {
        id: seat.service.id,
        quantity: 1,
      },
      ...previous,
    ],
    [] as CreateOrderPayloadServices
  );

  return seatServicesArray;
};
