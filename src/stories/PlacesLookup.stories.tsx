import type { Meta } from "@storybook/react";
import {
  PlacesLookup,
  PlacesLookupProps,
} from "../components/PlacesLookup/PlacesLookup";

export default {
  title: "PlacesLookup",
  component: PlacesLookup,
  decorators: [
    (Story) => (
      <div className="duffel-components">
        <Story />
      </div>
    ),
  ],
} as Meta;

const defaultProps: PlacesLookupProps = {
  onPlaceSelected: (selection) =>
    alert(`Selected: ${JSON.stringify(selection)}`),
};

export const Default: React.FC = () => (
  <div style={{ width: "350px" }}>
    <PlacesLookup {...defaultProps} />
  </div>
);
