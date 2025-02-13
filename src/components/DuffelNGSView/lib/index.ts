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

export const NGS_SHELF_INFO: Record<
  NonNullable<OfferSlice["ngs_shelf"]>,
  ShelfInfo
> = {
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
    full_title: "Plus",
    description:
      "Preferred seating that offers more comfort to passengers, such as additional legroom, width or having the middle seat free for the row.",
    icon: "airline_seat_legroom_extra",
  },
  4: {
    short_title: "Premium",
    full_title: "Premium",
    description:
      "Premium seating with additional legroom and recline. Seats shall be typically situated in the premium economy cabin or higher.",
    icon: "airline_seat_recline_extra",
  },
  5: {
    short_title: "Luxury",
    full_title: "Luxury",
    description:
      "Luxury seating with additional legroom and reclines to a lie flat position. Seats shall be typically situated in business class or higher.",
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
