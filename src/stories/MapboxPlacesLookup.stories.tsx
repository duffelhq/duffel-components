import type { Meta } from "@storybook/react";
import {
  MapboxPlacesLookup,
  MapboxPlacesLookupProps,
} from "../components/MapboxPlacesLookup/MapboxPlacesLookup";
import "../styles/components/PlacesLookup.css";

export default {
  title: "MapboxPlacesLookup",
  component: MapboxPlacesLookup,
} as Meta;

const defaultProps: MapboxPlacesLookupProps = {
  mapboxPublicKey: process.env.MAPBOX_PUBLIC_KEY as string,
  onPlaceSelected: (selection) =>
    console.log(`Selected: ${JSON.stringify(selection)}`),
  placeholder: "Search for any place",
  inputClassName: "places-lookup-input",
  popupClassName: "places-lookup-popover",
  highlightedPopupItemClassName: "places-lookup-popover-item--highlighted",
};

export const Default: React.FC = () => (
  <div style={{ width: "350px" }}>
    <MapboxPlacesLookup {...defaultProps} />
  </div>
);

export const WithStyles: React.FC = () => (
  <div style={{ width: "350px" }}>
    <MapboxPlacesLookup
      {...{
        ...defaultProps,
        // This will make it look weird but it's just so we can see the styles picked up
        inputClassName: "button",
      }}
    />
  </div>
);
