import type { Meta } from "@storybook/react";
import React from "react";
import {
  MapboxPlacesLookup,
  MapboxPlacesLookupProps,
} from "../components/MapboxPlacesLookup/MapboxPlacesLookup";

export default {
  title: "MapboxPlacesLookup",
  component: MapboxPlacesLookup,
} as Meta;

const defaultProps: MapboxPlacesLookupProps = {
  mapboxPublicKey: process.env.MAPBOX_PUBLIC_KEY as string,
  onPlaceSelected: (selection) =>
    alert(`Selected: ${JSON.stringify(selection)}`),
  placeholder: "Search for any place",
};

export const Default: React.FC = () => (
  <div style={{ width: "350px" }}>
    <MapboxPlacesLookup {...defaultProps} />
  </div>
);
