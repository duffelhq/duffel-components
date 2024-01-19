import { Meta } from "@storybook/react";
import { NGSShelfInfoCard } from "@components/DuffelNGSView/NGSShelfInfoCard";
import { NGS_SHELVES } from "@components/DuffelNGSView/lib";

export default {
  title: "NGSShelfInfoCard",
  component: NGSShelfInfoCard,
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
      gridTemplateColumns: "1 fr",
      gridGap: "32px",
      width: "400px",
      backgroundColor: "#F6F5F9",
      padding: "32px",
    }}
  >
    {NGS_SHELVES.map((ngs_shelf) => (
      <div key={ngs_shelf}>
        <NGSShelfInfoCard ngs_shelf={ngs_shelf} />
      </div>
    ))}
  </div>
);
