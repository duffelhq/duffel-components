import { Icon } from "@components/shared//Icon";
import { ModalBody } from "@components/shared/Modal";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import React from "react";
import {
  Offer,
  OfferAvailableServiceCancelForAnyReason,
} from "../../../types/Offer";
import { CfarSelectionModalBodyListItem } from "./CfarSelectionModalBodyListItem";

export interface CfarSelectionModalBodyProps {
  offerCurrency: Offer["base_currency"];
  service: OfferAvailableServiceCancelForAnyReason;
}

export const CfarSelectionModalBody: React.FC<CfarSelectionModalBodyProps> = ({
  offerCurrency,
  service,
}) => (
  <ModalBody>
    <ul style={{ padding: 0 }}>
      <CfarSelectionModalBodyListItem>
        Cancel your trip for any reason
      </CfarSelectionModalBodyListItem>

      <CfarSelectionModalBodyListItem>
        Guaranteed refund of{" "}
        {moneyStringFormatter(offerCurrency)(+service.metadata.refund_amount)}
      </CfarSelectionModalBodyListItem>

      <CfarSelectionModalBodyListItem>
        Redeemable up to 24 hours before first flight departure
      </CfarSelectionModalBodyListItem>
    </ul>
    <a
      href={service.metadata.terms_and_conditions_url}
      rel="noopener noreferrer"
      target="_blank"
      className="p2--regular"
      style={{
        color: "var(--GREY-600)",
      }}
    >
      Terms and conditions
      <Icon
        name="north_east"
        size={16}
        style={{
          display: "inline",
          verticalAlign: "middle",
          marginLeft: "4px",
        }}
      />
    </a>
  </ModalBody>
);
