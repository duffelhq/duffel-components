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
  <button
    onClick={onClick}
    style={{
      appearance: "none",
      background: "transparent",
      border: "solid 1px rgba(226, 226, 232, 1)",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "26px 1fr auto",
      rowGap: "8px",
      columnGap: "20px",
      padding: "20px",
      borderRadius: "8px",
    }}
  >
    <div style={{ border: "solid 1px red" }}>
      <Icon name={icon} />
    </div>
    <div style={{ textAlign: "start" }}>{title}</div>
    <div style={{ border: "solid 1px red" }}>
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
    </div>
    <div />
    <div style={{ textAlign: "start" }}>{children}</div>
    <div style={{ border: "solid 1px red" }}>
      <Button text="Add" intent="PRIMARY" />
    </div>
  </button>
);
