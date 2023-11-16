import {
  Airline,
  Airport,
  CreateOrderPassenger,
  DuffelPassengerGender,
  DuffelPassengerTitle,
  Place,
} from "@duffel/api/types";

export interface TravelDetails<T extends "order" | "offer" | "diff"> {
  originDestination: string;
  departingAt: string;
  origin: T extends "diff" ? string : Airport | Place;

  arrivingAt: string;
  destination: T extends "diff" ? string : Airport | Place;

  aircraft: string | null;
  cabinClass: string;

  fareBrandName?: T extends "offer" ? string : never;
  flightDuration: string | null;

  flight: string;

  // For the diff view of an order, we use the `operatingCarrier` and `marketingCarrier` properties directly
  airline: T extends "diff" ? null : Airline;
  operatedBy?: string;

  baggagesIncluded?: {
    carryOn?: number;
    checked?: number;
  };

  originTerminal?: string | null;
  destinationTerminal?: string | null;
}

export interface LayoverDetails {
  airport: Airport | Place;
  duration: string;
  originDestinationKey?: string;
}

export interface SliceTravelItem {
  type: "travel";
  travelDetails: TravelDetails<"order" | "offer">;
  layoverDetails?: never;
  id: string;
}

export interface SliceLayoverItem {
  type: "layover";
  travelDetails?: never;
  layoverDetails: LayoverDetails;
}

export type SliceItem = SliceTravelItem | SliceLayoverItem;

export type SliceDetails = SliceItem[];

export type FilterItems = Record<string, string>;

export type SliceDetailItemChangeStatus =
  | "no_change"
  | "added"
  | "removed"
  | "changed";

export type ProcessedRequestError = {
  errorTitle?: string;
  errorMessage: string;
  requestId?: string;
};

export type PropsOrError<T> = Readonly<
  | ({ error: true } & ProcessedRequestError)
  | { error: false; props: T }
  | { redirect: string }
>;

export type RandomlyGeneratedPassenger = Omit<
  CreateOrderPassenger,
  "email" | "identityDocuments" | "infantPassengerId" | "phoneNumber"
>;

export type ValueOf<T> = Required<T>[keyof T];

export const WebhookEventTypes = [
  "order.created",
  "order.airline_initiated_change_detected",
] as const;
export type WebhookEventType = (typeof WebhookEventTypes)[number];

export const FilterableWebhookEventTypes = [
  ...WebhookEventTypes,
  "ping.triggered",
] as const;

export type FilterableWebhookEventType =
  (typeof FilterableWebhookEventTypes)[number];

// we got this from node_modules/unleash-proxy-client/build/index.d.ts:78
export type UnleashContext = {
  appName: string;
  environment?: string;
  userId?: string;
  sessionId?: string;
  remoteAddress?: string;
  properties?: {
    [key: string]: string;
  };
};

export type RandomlyGeneratedPeople = {
  title: DuffelPassengerTitle;
  familyName: string;
  givenName: string;
  gender: DuffelPassengerGender;
};
