import { Color, colors } from "@lib/colors";
import classNames from "classnames";

export const getHighlightStyles = (
  highlightAll: boolean,
  key?: string,
  keysToHighlight?: string[],
  highlightColor?: Color,
) => {
  const highlightClasses = classNames("highlight");

  return {
    ...((highlightAll || (key && keysToHighlight?.includes(key))) && {
      className: highlightClasses,
      style: {
        backgroundColor: colors[highlightColor || "--GREY-700"],
      },
    }),
  };
};
