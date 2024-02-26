import { IconName } from "@components/shared/Icon";
import { OfferSlice, SeatType } from "@duffel/api/types";
export const NGS_SHELVES = [1, 2, 3, 4, 5] as const;
export type NGSShelf = OfferSlice["ngs_shelf"];
type ShelfInfo = {
  short_title: string;
  full_title: string;
  description: string;
  icon: IconName;
};

export const NGS_SHELF_INFO: Record<OfferSlice["ngs_shelf"], ShelfInfo> = {
  1: {
    short_title: "Basic",
    full_title: "Basic Economy",
    description:
      "Basic economy seats without seat selection, flexible change/cancellation options or checked baggage.",
    icon: "carry_on_bag_inactive",
  },
  2: {
    short_title: "Standard",
    full_title: "Standard Economy",
    description:
      "Economy seats that allow seat selection, flexible change/cancellation options and checked baggage.",
    icon: "airline_seat_recline_normal",
  },
  3: {
    short_title: "Plus",
    full_title: "Economy Plus",
    description:
      "Economy seats with extra leg room that allow seat selection, flexible change and cancellation options and checked baggage.",
    icon: "airline_seat_legroom_extra",
  },
  4: {
    short_title: "Premium",
    full_title: "Premium Economy",
    description:
      "Premium seats that have a recliner seat type, allow seat selection, flexible change and cancellation options and checked baggage.",
    icon: "airline_seat_recline_extra",
  },
  5: {
    short_title: "Luxury",
    full_title: "Luxury",
    description:
      "A luxury seat with a lie flat bed, seat selection, flexible change and cancellation options and checked baggage.",
    icon: "airline_seat_flat",
  },
};

export const SEAT_ICONS_MAP: Record<SeatType, IconName> = {
  standard: "airline_seat_recline_normal",
  extra_legroom: "airline_seat_legroom_extra",
  skycouch: "airline_seat_recline_extra",
  recliner: "airline_seat_recline_extra",
  angle_flat: "airline_seat_recline_extra",
  full_flat: "airline_seat_flat",
  private_suite: "airline_seat_individual_suite",
};
