import { setBodyScrollability } from "@lib/setBodyScrollability";
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
    setBodyScrollability(!isOpen);
    return () => setBodyScrollability(true);
  }, [isOpen]);

  return (
    <div className={classNames("modal", isOpen && "modal--open")}>
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

export const ModalBody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className={"modal-body"}>{children}</div>;
