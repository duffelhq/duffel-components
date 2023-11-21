import { getDateObject } from "./getDateObject";
import { toUTCDate } from "./toUTCDate";

export const MS = 1000;
export const MS_PER_MINUTE = MS * 60;
export const MS_PER_HOUR = MS_PER_MINUTE * 60;
export const MS_PER_DAY = MS_PER_HOUR * 24;

export const getDayDiff = (from: Date | string, to?: Date | string): number => {
  const fromDate = typeof from === "string" ? getDateObject(from) : from;
  if (!fromDate) return 0;

  let toDate: Date | null = new Date();
  if (to) {
    if (typeof to === "string") {
      toDate = getDateObject(to);
    } else {
      toDate = to;
    }
  }

  if (!toDate) return 0;

  // There's an edge case with expiry at 23:59 UTC showing wrong in BST
  const localDiff = fromDate.getDay() - toDate.getDay();
  const utcDiff =
    (toUTCDate(fromDate).valueOf() - toUTCDate(toDate).valueOf()) / MS_PER_DAY;
  const diff = localDiff === 1 && utcDiff === 0 ? localDiff : utcDiff;
  return Math.sign(diff) * Math.ceil(Math.abs(diff));
};
