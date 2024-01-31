import { setBodyScrollability } from "@lib/setBodyScrollability";
import classNames from "classnames";
import * as React from "react";
import { IconButton } from "./IconButton";

export interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose, isOpen }) => {
  React.useEffect(() => {
    setBodyScrollability(!isOpen);
    return () => setBodyScrollability(true);
  }, [isOpen]);

  return (
    <div
      className={classNames("modal", isOpen && "modal--open")}
      // setting inline style to avoid modal content to flash unstyled before stylesheet is loaded
      style={{ opacity: 0 }}
    >
      <div role="presentation" className={"modal--content"}>
        {children}

        <IconButton
          icon="close"
          onClick={onClose}
          title="Close modal"
          className="modal--close-button"
        />
      </div>
    </div>
  );
};

interface ModalBodyProps {
  tall?: boolean;
  noPadding?: boolean;
  children: React.ReactNode;
}
export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  tall,
  noPadding,
}) => (
  <div
    className={classNames(
      "modal-body",
      noPadding && "modal-body--no-padding",
      tall && "modal-body--tall",
    )}
  >
    {children}
  </div>
);
