import { SeatMapCabin } from "../types/SeatMap";

export const hasWings = (cabin: SeatMapCabin, rowIndex: number) =>
  Boolean(
    cabin.wings &&
      cabin.wings.first_row_index <= rowIndex &&
      cabin.wings.last_row_index >= rowIndex
  );
