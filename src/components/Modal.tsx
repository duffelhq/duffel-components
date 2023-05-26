import { disableBodyScroll } from "@lib/disableBodyScroll";
import { enableBodyScroll } from "@lib/enableBodyScroll";
import classNames from "classnames";
import * as React from "react";
import { IconButton } from "./IconButton";

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose, isOpen }) => {
  React.useEffect(() => {
    if (isOpen) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }

    return enableBodyScroll;
  }, [isOpen]);

  return (
    <div className={classNames("modal", isOpen && "modal--open")}>
      <div role="presentation" className={"modal--content"}>
        {children}
        <IconButton
          className="modal--close-button"
          onClick={onClose}
          title="Close modal"
          icon="close"
        />
        {/* 
        next version coming soon, when new button is ready
        <IconButton
          icon="close"
          onClick={onClose}
          title="Close modal"
          className="modal--close-button"
        /> */}
      </div>
    </div>
  );
};

export const ModalBody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className={"modal-body"}>{children}</div>;
