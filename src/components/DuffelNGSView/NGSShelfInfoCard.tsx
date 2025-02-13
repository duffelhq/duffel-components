import * as React from "react";
import { NGSShelf, NGS_SHELF_INFO } from "./lib";
import { Icon } from "@components/shared/Icon";
import classNames from "classnames";

export interface NGSShelfInfoCardProps {
  ngs_shelf: NGSShelf;
  className?: string;
}

export const NGSShelfInfoCard: React.FC<NGSShelfInfoCardProps> = ({
  ngs_shelf,
  className,
}) => {
  if (!ngs_shelf) return null;
  const shelfInfo = NGS_SHELF_INFO[ngs_shelf];

  if (!shelfInfo) return null;

  return (
    <div className={classNames("ngs-shelf-info-card_container", className)}>
      <Icon name={shelfInfo.icon} size={24} />
      <h3 className="ngs-shelf-info-card_title">{shelfInfo.full_title}</h3>
      <p className="ngs-shelf-info-card_text">{shelfInfo.description}</p>
    </div>
  );
};
