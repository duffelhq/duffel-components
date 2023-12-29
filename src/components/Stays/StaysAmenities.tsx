import * as React from "react";
import { HSpace } from "@components/shared/HSpace";
import { Icon, IconName } from "@components/shared/Icon";
import { StaysAccommodation, StaysAmenity } from "@duffel/api/types";
import { WithComponentStyles } from "@components/shared/WithComponentStyles";

export const amenityIcon = (type: StaysAmenity["type"]): IconName => {
  switch (type) {
    case "adult_only":
      return "no_stroller";
    case "accessibility_hearing":
      return "hearing";
    case "accessibility_mobility":
      return "accessible";
    case "cash_machine":
      return "atm";
    case "spa":
      return "spa";
    case "pool":
      return "pool";
    case "childcare_service":
      return "child_care";
    case "laundry":
      return "laundry";
    case "pets_allowed":
      return "pet_supplies";
    case "room_service":
      return "room_service";
    case "wifi":
      return "wifi";
    case "gym":
      return "fitness_center";
    case "parking":
      return "local_parking";
    case "business_centre":
      return "meeting_room";
    case "restaurant":
      return "restaurant";
    case "lounge":
      return "local_bar";
    case "24_hour_front_desk":
    case "concierge":
      return "concierge";
    default:
      return "check_circle";
  }
};

export interface StaysAmenitiesProps {
  amenities: StaysAccommodation["amenities"];
}

export const StaysAmenities: React.FC<StaysAmenitiesProps> = ({
  amenities,
}) => (
  <WithComponentStyles>
    {amenities?.map((amenity) => (
      <HSpace
        key={amenity.type}
        space={4}
        alignCenter
        className="duffel-components"
      >
        <Icon name={amenityIcon(amenity.type)} size={16} />
        <p className="amenities__text">{amenity.description}</p>
      </HSpace>
    ))}
  </WithComponentStyles>
);
