import classNames from "classnames";
import * as React from "react";
import { HSpace } from "./HSpace";
import { Icon } from "./Icon";

export interface RadioButtonProps {
  value: string;
  checked?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  checked = false,
}) => {
  const inputId = `radio-${value}`;
  return (
    <div>
      <input
        id={inputId}
        type="radio"
        value={value}
        checked={checked}
        className="radio__input"
      />
      <label
        className="radio__container"
        htmlFor={inputId}
        aria-checked={checked}
        data-testid={value}
      >
        <HSpace space={12}>
          <div
            className={classNames("radio", {
              ["radio--is-checked"]: checked,
            })}
          >
            {checked && <Icon name="check" size={18} />}
          </div>
        </HSpace>
      </label>
    </div>
  );
};
