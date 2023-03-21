import { Icon } from "@components/Icon";
import classNames from "classnames";
import * as React from "react";
import { OfferSliceSegment } from "src/types/Offer";

interface SegmentComponentProps {
  segment: OfferSliceSegment;
  className?: string;
}

export const Segment: React.FC<SegmentComponentProps> = ({
  segment,
  className,
}) => (
  <h3 className={classNames(className, "passenger-segment__title")}>
    {segment.origin.iata_code}
    <Icon name="chevron" className="passenger-segment__chevron" size={20} />
    {segment.destination.iata_code}
  </h3>
);
