import classNames from "classnames";
import * as React from "react";
import { IconButton } from "./IconButton";
import { setBodyScrollability } from "@lib/setBodyScrollability";

interface ModalProps {
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
    <div className={classNames("modal", isOpen && "modal--open")}>
      <div role="presentation" className={"modal--content"}>
        {children}
        <IconButton
          className="modal--close-button"
          onClick={onClose}
          title="Close modal"
          icon="close"
        />
      </div>
    </div>
  );
};

export const ModalBody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className={"modal-body"}>{children}</div>;
