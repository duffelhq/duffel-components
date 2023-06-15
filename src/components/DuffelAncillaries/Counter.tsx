import { IconButton } from "@components/shared/IconButton";
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
}) => (
  <div className="counter" id={id}>
    <IconButton
      icon="minus"
      title="Remove one"
      id={`${id}-minus`}
      data-testid={`${id}-minus`}
      variant="outlined"
      disabled={value <= min}
      onClick={() => onChange(Math.max(value - 1, min))}
    />
    <div className="counter__count-label">{value}</div>
    <IconButton
      icon="add"
      title="Add one"
      id={`${id}-plus`}
      data-testid={`${id}-plus`}
      variant="outlined"
      disabled={value >= max}
      onClick={() => onChange(Math.min(value + 1, max))}
    />
  </div>
);
