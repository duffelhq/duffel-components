import * as React from "react";
import { Button } from "./Button";

export const Modal: React.FC<{
  children: React.ReactNode;
  onClose: () => void;
}> = ({ children, onClose }) => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="modal">
      <div role="presentation" className="modal--content">
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
