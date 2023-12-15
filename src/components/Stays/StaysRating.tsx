import * as React from "react";
import { HSpace } from "@components/shared/HSpace";
import { Icon } from "@components/shared/Icon";

export interface StaysRatingProps {
  rating: number | null;
  small?: boolean;
}

export const StaysRating: React.FC<StaysRatingProps> = ({ rating, small }) => {
  if (!rating) {
    return null;
  }

  return (
    <HSpace space={0}>
      {Array.from({ length: rating }).map((_, index) => (
        <Icon key={index} name="star" color="#ffb524" size={small ? 8 : 12} />
      ))}
    </HSpace>
  );
};
