import { Button } from "./Button";
import * as React from "react";

interface CounterProps {
  id: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export const Counter: React.FC<CounterProps> = ({
  id,
  min,
  max,
  value,
  onChange,
}) => {
  return (
    <div className="counter" id={id}>
      <Button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(Math.max(value - 1, min))}
        iconOnly="minus"
        text="Minus"
        intent="OUTLINED"
        id={`${id}-minus`}
      />
      <div className="counter__count-label">{value}</div>
      <Button
        text="Plus"
        iconOnly="add"
        type="button"
        disabled={value >= max}
        onClick={() => onChange(Math.min(value + 1, max))}
        intent="OUTLINED"
        id={`${id}-plus`}
      />
    </div>
  );
};
