export interface StampProps {
  backgroundColor: React.CSSProperties["backgroundColor"];
  color: React.CSSProperties["color"];
  children: React.ReactNode;
}

export const Stamp: React.FC<StampProps> = ({
  backgroundColor,
  color,
  children,
}) => (
  <div
    style={{
      backgroundColor,
      color,
      padding: "2px 8px",
      whiteSpace: "nowrap",
      borderRadius: "4px",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "20px",
      textAlign: "center",
    }}
  >
    {children}
  </div>
);
