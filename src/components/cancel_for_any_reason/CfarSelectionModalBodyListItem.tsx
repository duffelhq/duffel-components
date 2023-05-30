import { Icon } from "@components/Icon";
import React, { ReactNode } from "react";

export const CfarSelectionModalBodyListItem: React.FC<{
  children: ReactNode;
}> = ({ children }) => (
  <li className="cfar-modal-list-item">
    <Icon name="check" />
    <p>{children}</p>
  </li>
);
