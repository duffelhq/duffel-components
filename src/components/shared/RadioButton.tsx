import classNames from "classnames";
import * as React from "react";
import { HSpace } from "./HSpace";
import { Icon } from "./Icon";

export interface RadioButtonProps<T extends string | number> {
  value: T;
  checked?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps<any>> = ({
  value,
  checked = false,
  ...props
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
        {...props}
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
