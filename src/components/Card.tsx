import { Button } from "./Button";
import { Icon, IconName } from "./Icon";
import { Stamp } from "./Stamp";

interface CardProps {
  title: string;
  icon: IconName;
  statusTag: "added" | "not-added";
  onClick: () => void;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  icon,
  statusTag,
  onClick,
  children,
}) => (
  <div
    style={{
      background: "transparent",
      border: "solid 1px rgba(226, 226, 232, 1)",
      display: "grid",
      gridTemplateColumns: "26px 1fr 100px",
      rowGap: "20px",
      columnGap: "20px",
      padding: "20px",
      borderRadius: "8px",
    }}
  >
    <div>
      <Icon name={icon} />
    </div>
    <div
      style={{
        textAlign: "start",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "24px",
      }}
    >
      {title}
    </div>
    {statusTag === "added" && (
      <Stamp color="#092B00" backgroundColor="#F6FFED">
        Added
      </Stamp>
    )}
    {statusTag === "not-added" && (
      <Stamp backgroundColor="#F6F5F9" color="#4B4B55">
        Not added
      </Stamp>
    )}
    <div />
    <div
      style={{
        textAlign: "start",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px",
        color: "#696972",
        // TODO: how does styling work?
      }}
    >
      {children}
    </div>
    <div style={{ display: "flex", justifyContent: "end" }}>
      <Button text="Add" intent="PRIMARY" onClick={onClick} />
    </div>
  </div>
);
