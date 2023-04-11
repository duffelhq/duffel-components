import { createContext, useContext } from "react";
import {
  SeatMap,
  SeatMapCabinRowSectionAvailableService,
  SeatMapCabinRowSectionElementSeat,
} from "src/types/SeatMap";
import { Offer } from "src/types/Offer";

export const sizes = {
  default: {
    element: 32,
    icon: 24,
    spacing: 8,
  },
  small: {
    element: 26,
    icon: 16,
    spacing: 6,
  },
};

export type Size = keyof typeof sizes;

const noop = () => ({});

export interface SeatSelectionPassenger {
  id: string;
  name?: string | null;
}

export type SeatSelectionContextInterface = {
  [segmentId: string]: SeatSelectionForSegment;
};

export type SeatSelectionForSegment = {
  [passengerId: string]: SeatInformation | null;
};
export type SeatInformation = {
  designator: string;
  service: SeatMapCabinRowSectionAvailableService;
};

export interface CurrentSeat {
  seat: SeatMapCabinRowSectionElementSeat | null;
  service: SeatMapCabinRowSectionAvailableService | undefined;
}

export interface ExtendedSeatInfo {
  segment: string;
  seat: SeatMapCabinRowSectionElementSeat;
  service: SeatMapCabinRowSectionAvailableService;
}

export interface SeatSelectionContextValue {
  offer: Offer;
  seatMaps: SeatMap[];
  seatSelection: SeatSelectionContextInterface;
  size: Size;
  // TODO: get rid of currentSeat and setCurrentSeat as this can (and should be) derived from `seatSelection` value.
  currentSeat: CurrentSeat;
  setCurrentSeat: (seat: CurrentSeat) => void;
  onSelectSeat: (seat: SeatInformation | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  extendedSeatInfo: ExtendedSeatInfo[];
  setExtendedSeatInfo: (seat: ExtendedSeatInfo[]) => void;
  currency: string;
}

export const SeatSelectionContext = createContext<SeatSelectionContextValue>({
  offer: {} as Offer,
  seatMaps: [],
  seatSelection: {} as SeatSelectionContextInterface,
  size: "default",
  currentSeat: {} as CurrentSeat,
  setCurrentSeat: noop,
  onSelectSeat: noop,
  setIsLoading: noop,
  extendedSeatInfo: [],
  setExtendedSeatInfo: noop,
  currency: "",
});

export const useSeatSelectionContext = () => useContext(SeatSelectionContext);
