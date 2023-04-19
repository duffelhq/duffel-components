import classNames from "classnames";
import * as React from "react";
import { Icon } from "../Icon";

interface ExitElementProps {
  isRight: boolean;
}

export const ExitElement: React.FC<ExitElementProps> = ({ isRight }) => (
  <div
    className={classNames("map-element map-element--exit", {
      "map-element--exit--right": isRight,
    })}
  >
    {isRight ? <Icon name="exit_row_right" /> : <Icon name="exit_row" />}
  </div>
);
