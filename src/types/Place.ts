import { Airport } from "./Airport";
import { City } from "./City";

export type Place =
  | (Airport & { type?: "airport"; airports?: Airport[] | null })
  | (City & { type?: "city" });
