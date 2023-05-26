import { Icon } from "@components/Icon";
import React, { ReactNode } from "react";
import { OfferAvailableCancelForAnyReasonService } from "../../types/Offer";
import { moneyStringFormatter } from "@lib/formatConvertedCurrency";
import { ModalBody } from "@components/Modal";

export interface CfarSelectionModalBodyProps {
  service: OfferAvailableCancelForAnyReasonService;
}

export const CfarSelectionModalBody: React.FC<CfarSelectionModalBodyProps> = ({
  service,
}) => (
  <ModalBody>
    <ul style={{ padding: 0 }}>
      <ListItem>Cancel your trip for any reason</ListItem>
      <ListItem>
        Guaranteed refund of{" "}
        {moneyStringFormatter(service.total_currency)(
          +service.metadata.refund_amount
        )}
      </ListItem>
      <ListItem>Redeemable up to 24hrs before first flight departure</ListItem>
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
    </a>
  </ModalBody>
);

const ListItem: React.FC<{ children: ReactNode }> = ({ children }) => (
  <li
    style={{
      margin: 0,
      padding: 0,
      display: "flex",
      alignItems: "center",
      columnGap: "8px",
    }}
  >
    <Icon name="check" style={{ fill: "rgb(var(--ACCENT))" }} />
    <p
      style={{
        margin: 0,
        padding: 0,
      }}
    >
      {children}
    </p>
  </li>
);
