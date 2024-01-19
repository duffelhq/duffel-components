import * as React from "react";
import { NGSShelf, NGS_SHELF_INFO } from "./lib";
import { Icon } from "@components/shared/Icon";

export interface NGSShelfInfoCardProps {
  ngs_shelf: NGSShelf;
}

export const NGSShelfInfoCard: React.FC<NGSShelfInfoCardProps> = ({
  ngs_shelf,
}) => {
  const shelfInfo = NGS_SHELF_INFO[ngs_shelf];
  return (
    <div className="ngs-shelf-info-card_container">
      <Icon name={shelfInfo.icon} size={24} />
      <h3 className="ngs-shelf-info-card_title">{shelfInfo.full_title}</h3>
      <p className="ngs-shelf-info-card_text">{shelfInfo.description}</p>
      <div className="ngs-shelf-info-card_items">
        <div>
          <Icon name={shelfInfo.seat.icon} size={16} color="--GREY-600" />
          <span className="ngs-shelf-info-card_text">
            {shelfInfo.seat.description}
          </span>
        </div>
        <div>
          <Icon
            name={shelfInfo.checked_bag ? "luggage" : "close"}
            size={16}
            color="--GREY-600"
          />
          <span className="ngs-shelf-info-card_text">Checked bag</span>
        </div>
        <div>
          <Icon
            name={shelfInfo.seat_selection ? "check_small" : "close"}
            size={16}
            color="--GREY-600"
          />
          <span className="ngs-shelf-info-card_text">Seat selection</span>
        </div>
      </div>
    </div>
  );
};
