import * as React from "react";
import { Button } from "./Button";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  modalContentStyle?: React.CSSProperties;
  modalOverlayStyle?: React.CSSProperties;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  modalContentStyle,
  modalOverlayStyle,
}) => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="modal" style={modalOverlayStyle}>
      <div
        role="presentation"
        className="modal--content"
        style={modalContentStyle}
      >
        {children}
        <Button
          intent="INVISIBLE"
          className="modal--close-button"
          onClick={onClose}
          text="Close"
          size="small"
        />
      </div>
    </div>
  );
};
