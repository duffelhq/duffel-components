import * as React from "react";
import { HSpace } from "@components/shared/HSpace";
import { Icon } from "@components/shared/Icon";

const COMPONENT_CDN = process.env.COMPONENT_CDN || "";
const hrefToComponentStyles = `${COMPONENT_CDN}/global.css`;

export interface StaysRatingProps {
  rating: number;
  small?: boolean;
}

export const StaysRating: React.FC<StaysRatingProps> = ({ rating, small }) => (
  <>
    <link rel="stylesheet" href={hrefToComponentStyles}></link>
    <HSpace space={0} className="duffel-components">
      {Array.from({ length: rating }).map((_, index) => (
        <Icon
          key={index}
          name="star"
          color="--YELLOW-600"
          size={small ? 8 : 12}
        />
      ))}
    </HSpace>
  </>
);
