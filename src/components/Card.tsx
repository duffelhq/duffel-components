import { Button } from "./Button";
import { Icon, IconName } from "./Icon";

export interface CardProps {
  title: string;
  icon: IconName;
  onClick?: (() => void) | null;
  children: React.ReactNode;
  ctaLabel: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  icon,
  onClick,
  children,
  ctaLabel,
}) => (
  <div
    style={{
      background: "transparent",
      border: "solid 1px rgba(226, 226, 232, 1)",
      display: "flex",
      rowGap: "20px",
      padding: "20px",
      borderRadius: "8px",
      justifyContent: "space-between",
    }}
  >
    <p
      style={{
        textAlign: "start",
        display: "flex",
        alignItems: "center",
        columnGap: "8px",
      }}
      className="p1--semibold"
    >
      <Icon name={icon} />
      {title}
    </p>
    <div
      style={{
        textAlign: "start",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px",
        color: "#696972",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      {children}
      <div style={{ marginLeft: "12px" }}>
        {onClick !== undefined && (
          <Button
            text={ctaLabel}
            intent="PRIMARY"
            onClick={onClick || undefined}
            disabled={onClick === null}
          />
        )}
      </div>
    </div>
  </div>
);
