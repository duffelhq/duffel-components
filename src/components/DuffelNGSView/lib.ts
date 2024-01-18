import { IconName } from "@components/shared/Icon";
import {
  Offer,
  OfferSlice,
  OfferSliceSegment,
  OfferSliceSegmentPassenger,
} from "@duffel/api/types";

// These types are temporary until this is in the official API
type SeatWithNGS = { type: string; flatness: string };
type CabinWithNGS = {
  amenities: {
    seat: SeatWithNGS;
    power: { available: boolean };
    wifi: {
      available: boolean;
      cost: "free" | "paid" | "free or paid" | "n/a";
    };
  };
  layout: { type: string };
};
type OfferSliceSegmentPassengerWithNGS = OfferSliceSegmentPassenger & {
  cabin: CabinWithNGS;
  ticket_attributes: { advanced_selection_available: boolean };
};
type OfferSliceSegmentWithNGS = OfferSliceSegment & {
  passengers: OfferSliceSegmentPassengerWithNGS[];
};
type OfferSliceWithNGS = OfferSlice & {
  segments: OfferSliceSegmentWithNGS[];
  ngs_shelf: number;
};
export type OfferWithNGS = Offer & {
  slices: OfferSliceWithNGS[];
};

type SeatType =
  | "Standard seat"
  | "Extra legroom"
  | "Larger seat"
  | "Lie flat bed";

type ShelfInfo = {
  short_title: string;
  full_title: string;
  description: string;
  seat: SeatType;
  checked_bag: boolean;
  seat_selection: boolean;
  icon: IconName;
};

export const NGSShelfInfo: Record<string, ShelfInfo> = {
  "1": {
    short_title: "Basic",
    full_title: "Basic Economy",
    description:
      "Basic economy seats without seat selection, flexible change/cancellation options or checked baggage.",
    seat: "Standard seat",
    checked_bag: false,
    seat_selection: false,
    icon: "carry_on_bag_inactive",
  },
  "2": {
    short_title: "Standard",
    full_title: "Standard Economy",
    description:
      "Economy seats that allow seat selection, flexible change/cancellation options and checked baggage.",
    seat: "Standard seat",
    checked_bag: true,
    seat_selection: true,
    icon: "airline_seat_recline_normal",
  },
  "3": {
    short_title: "Plus",
    full_title: "Economy Plus",
    description:
      "Economy seats with extra leg room that allow seat selection, flexible change and cancellation options and checked baggage.",
    seat: "Extra legroom",
    checked_bag: true,
    seat_selection: true,
    icon: "airline_seat_legroom_extra",
  },
  "4": {
    short_title: "Premium",
    full_title: "Premium Economy",
    description:
      "Premium seats that have a recliner seat type, allow seat selection, flexible change and cancellation options and checked baggage.",
    seat: "Larger seat",
    checked_bag: true,
    seat_selection: true,
    icon: "airline_seat_recline_extra",
  },
  "5": {
    short_title: "Luxury",
    full_title: "Luxury",
    description:
      "A luxury seat with a lie flat bed, seat selection, flexible change and cancellation options and checked baggage.",
    seat: "Lie flat bed",
    checked_bag: true,
    seat_selection: true,
    icon: "airline_seat_flat",
  },
};

export type NGSShelf = keyof typeof NGSShelfInfo;

export const seatIconsMap: Record<SeatType, IconName> = {
  "Standard seat": "airline_seat_recline_normal",
  "Extra legroom": "airline_seat_legroom_extra",
  "Larger seat": "airline_seat_recline_extra",
  "Lie flat bed": "airline_seat_flat",
};
