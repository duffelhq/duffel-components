import { IconName } from "@components/shared/Icon";
import {
  Offer,
  OfferSlice,
  OfferSliceSegment,
  OfferSliceSegmentPassenger,
} from "@duffel/api/types";

export const NGS_SHELVES = ["1", "2", "3", "4", "5", "6"] as const;
export type NGSShelf = (typeof NGS_SHELVES)[number];

// TODO([@andrejak)](https://github.com/andrejak)) These types are temporary until this is in the official API
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
export type OfferSliceSegmentWithNGS = OfferSliceSegment & {
  passengers: OfferSliceSegmentPassengerWithNGS[];
};
type OfferSliceWithNGS = OfferSlice & {
  segments: OfferSliceSegmentWithNGS[];
  ngs_shelf: NGSShelf;
};
export type OfferWithNGS = Offer & {
  slices: OfferSliceWithNGS[];
};

type SeatType =
  | "Standard seat"
  | "Extra legroom"
  | "Larger seat"
  | "Lie flat bed"
  | "Lie flat suite";

type ShelfInfo = {
  short_title: string;
  full_title: string;
  description: string;
  seat: { description: SeatType; icon: IconName };
  checked_bag: boolean;
  seat_selection: boolean;
  icon: IconName;
};

export const SEAT_ICONS_MAP: Record<SeatType, IconName> = {
  "Standard seat": "airline_seat_recline_normal",
  "Extra legroom": "airline_seat_legroom_extra",
  "Larger seat": "airline_seat_recline_extra",
  "Lie flat bed": "airline_seat_flat",
  "Lie flat suite": "airline_seat_individual_suite",
};

export const NGS_SHELF_INFO: Record<NGSShelf, ShelfInfo> = {
  "1": {
    short_title: "Basic",
    full_title: "Basic Economy",
    description:
      "Basic economy seats without seat selection, flexible change/cancellation options or checked baggage.",
    seat: {
      description: "Standard seat",
      icon: SEAT_ICONS_MAP["Standard seat"],
    },
    checked_bag: false,
    seat_selection: false,
    icon: "carry_on_bag_inactive",
  },
  "2": {
    short_title: "Standard",
    full_title: "Standard Economy",
    description:
      "Economy seats that allow seat selection, flexible change/cancellation options and checked baggage.",
    seat: {
      description: "Standard seat",
      icon: SEAT_ICONS_MAP["Standard seat"],
    },
    checked_bag: true,
    seat_selection: true,
    icon: "airline_seat_recline_normal",
  },
  "3": {
    short_title: "Plus",
    full_title: "Economy Plus",
    description:
      "Economy seats with extra leg room that allow seat selection, flexible change and cancellation options and checked baggage.",
    seat: {
      description: "Extra legroom",
      icon: SEAT_ICONS_MAP["Extra legroom"],
    },
    checked_bag: true,
    seat_selection: true,
    icon: "airline_seat_legroom_extra",
  },
  "4": {
    short_title: "Premium",
    full_title: "Premium Economy",
    description:
      "Premium seats that have a recliner seat type, allow seat selection, flexible change and cancellation options and checked baggage.",
    seat: { description: "Larger seat", icon: SEAT_ICONS_MAP["Larger seat"] },
    checked_bag: true,
    seat_selection: true,
    icon: "airline_seat_recline_extra",
  },
  "5": {
    short_title: "Luxury",
    full_title: "Luxury",
    description:
      "A luxury seat with a lie flat bed, seat selection, flexible change and cancellation options and checked baggage.",
    seat: { description: "Lie flat bed", icon: SEAT_ICONS_MAP["Lie flat bed"] },
    checked_bag: true,
    seat_selection: true,
    icon: "airline_seat_flat",
  },
  // We might not include the Ultra shelf in the API currently
  "6": {
    short_title: "Ultra",
    full_title: "Ultra-Lux",
    description:
      "A luxury seat with a lie flat pod, seat selection, flexible change and cancellation options and checked baggage.",
    seat: {
      description: "Lie flat suite",
      icon: SEAT_ICONS_MAP["Lie flat suite"],
    },
    checked_bag: true,
    seat_selection: true,
    icon: "airline_seat_individual_suite",
  },
};
