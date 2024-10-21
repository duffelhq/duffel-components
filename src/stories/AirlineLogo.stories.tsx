import { AirlineLogo } from "@components/shared/AirlineLogo";
import { Meta } from "@storybook/react";

const AIRLINES = [
  ["American Airlines", "AA"],
  ["British Airways", "BA"],
  ["LATAM", "LA"],
  ["Singapore Airlines", "SQ"],
  ["Aeromexico", "AM"],
];

export default {
  title: "AirlineLogo",
  component: AirlineLogo,
  decorators: [
    (Story) => (
      <div className="duffel-components">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const FullList: React.FC = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridGap: "32px",
    }}
  >
    {AIRLINES.map(([name, iataCode]) => (
      <div
        key={name}
        style={{
          padding: "16px",
          border: "dashed 1px lightgrey",
          borderRadius: "2px",
          display: "flex",
          alignItems: "center",
          columnGap: "8px",
        }}
      >
        <AirlineLogo name={name} iataCode={iataCode} />
        <div>
          {name} ({iataCode})
        </div>
      </div>
    ))}
  </div>
);
