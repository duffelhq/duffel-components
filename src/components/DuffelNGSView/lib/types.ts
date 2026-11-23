import { OfferRequest } from "@duffel/api/types";

// These types list every field `DuffelNGSView` reads, so callers can pass
// offers trimmed to these fields. Reading a new field means adding it here,
// which changes what trimmed callers must keep.

type SDKRequestSlice = OfferRequest["slices"][number];
type SDKOffer = OfferRequest["offers"][number];
type SDKSlice = SDKOffer["slices"][number];
type SDKSegment = SDKSlice["segments"][number];
type SDKStop = SDKSegment["stops"][number];
type SDKSegmentPassenger = SDKSegment["passengers"][number];

type DuffelNGSViewStop = Pick<SDKStop, "duration"> & {
  airport: Pick<SDKStop["airport"], "iata_code">;
};

type DuffelNGSViewSegmentPassenger = Pick<
  SDKSegmentPassenger,
  "cabin_class" | "cabin_class_marketing_name"
> & {
  baggages: Pick<
    SDKSegmentPassenger["baggages"][number],
    "type" | "quantity"
  >[];
};

type DuffelNGSViewRequestSlice = Pick<SDKRequestSlice, "departure_date"> & {
  origin: Pick<SDKRequestSlice["origin"], "iata_code">;
  destination: Pick<SDKRequestSlice["destination"], "iata_code" | "name">;
};

export type DuffelNGSViewOfferSliceSegment = Pick<
  SDKSegment,
  | "marketing_carrier_flight_number"
  | "departing_at"
  | "arriving_at"
  | "duration"
> & {
  origin: Pick<SDKSegment["origin"], "iata_code" | "name">;
  destination: Pick<SDKSegment["destination"], "iata_code" | "name">;
  marketing_carrier: Pick<
    SDKSegment["marketing_carrier"],
    "iata_code" | "name"
  >;
  operating_carrier: Pick<SDKSegment["operating_carrier"], "name">;
  aircraft: Pick<SDKSegment["aircraft"], "name">;
  stops: DuffelNGSViewStop[];
  passengers: DuffelNGSViewSegmentPassenger[];
};

export type DuffelNGSViewOfferSlice = Pick<
  SDKSlice,
  "ngs_shelf" | "fare_brand_name" | "duration"
> & {
  origin: Pick<SDKSlice["origin"], "iata_code">;
  destination: Pick<SDKSlice["destination"], "iata_code">;
  conditions: Pick<
    SDKSlice["conditions"],
    | "change_before_departure"
    | "refund_before_departure"
    | "advance_seat_selection"
    | "priority_boarding"
    | "priority_check_in"
  >;
  segments: DuffelNGSViewOfferSliceSegment[];
};

export type DuffelNGSViewOffer = Pick<
  SDKOffer,
  "id" | "total_amount" | "total_currency"
> & {
  owner: Pick<SDKOffer["owner"], "iata_code" | "name">;
  conditions: Pick<
    SDKOffer["conditions"],
    "change_before_departure" | "refund_before_departure"
  >;
  slices: DuffelNGSViewOfferSlice[];
};

/**
 * The offer request `DuffelNGSView` draws. A full `OfferRequest` from the
 * Duffel API is accepted as it is; fields not listed here are ignored.
 */
export type DuffelNGSViewOfferRequest = {
  slices: DuffelNGSViewRequestSlice[];
  offers: DuffelNGSViewOffer[];
};
