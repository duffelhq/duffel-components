import * as React from "react";

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
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};
