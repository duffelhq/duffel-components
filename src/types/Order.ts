//TODO fix this type
export type Order = {
  id: string;
  [any: string]: any;
  slices: { segments: any[] }[];
};
export type OrderAvailableService = any;
