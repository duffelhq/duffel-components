import * as React from "react";
import { NGSShelf, NGSShelfInfo, seatIconsMap } from "./lib";
import { Icon } from "@components/shared/Icon";

export interface NGSShelfInfoCardProps {
  ngs_shelf: NGSShelf;
}

export const NGSShelfInfoCard: React.FC<NGSShelfInfoCardProps> = ({
  ngs_shelf,
}) => {
  const shelfInfo = NGSShelfInfo[ngs_shelf];
  return (
    <div className="ngs-shelf-info-card_container">
      <Icon name={shelfInfo.icon} size={24} />
      <h3 className="ngs-shelf-info-card_title">{shelfInfo.full_title}</h3>
      <p className="ngs-shelf-info-card_text">{shelfInfo.description}</p>
      <div className="ngs-shelf-info-card_items">
        <div>
          <Icon
            name={seatIconsMap[shelfInfo.seat]}
            size={16}
            color="--GREY-600"
          />
          <span className="ngs-shelf-info-card_text">{shelfInfo.seat}</span>
        </div>
        <div>
          <Icon
            name={shelfInfo.checked_bag ? "luggage" : "close"}
            size={20}
            color="--GREY-600"
            viewBox={shelfInfo.checked_bag ? "0 0 20 20" : "0 0 24 24"}
          />
          <span className="ngs-shelf-info-card_text">Checked bag</span>
        </div>
        <div>
          <Icon
            name={shelfInfo.seat_selection ? "check_small" : "close"}
            size={20}
            color="--GREY-600"
            viewBox={shelfInfo.seat_selection ? "0 0 20 20" : "0 0 24 24"}
          />
          <span className="ngs-shelf-info-card_text">Seat selection</span>
        </div>
      </div>
    </div>
  );
};
