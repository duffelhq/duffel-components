import { StaysAccommodation, StaysBooking } from "@duffel/api/types";
import { StaysRating } from "./StaysRating";
import { boardTypeIcon, getBoardTypeLabel } from "./lib/types";
import { VSpace } from "@components/shared/VSpace";
import { HSpace } from "@components/shared/HSpace";
import { Icon } from "@components/shared/Icon";
import { LOYALTY_PROGRAMS_NAME_MAP } from "./lib/types";
import { getDateString } from "@lib/getDateString";
import { WithComponentStyles } from "@components/shared/WithComponentStyles";

export interface StaysSummaryProps {
  accommodation: StaysAccommodation;
  checkInDate: Date;
  checkOutDate: Date;
  numRooms?: number;

  supportedLoyaltyProgramme?: StaysBooking["supported_loyalty_programme"];
  loyaltyProgrammeAccountNumber?: string | null;
  accommodationSpecialRequests?: string | null;
}

export const StaysSummary: React.FC<
  React.PropsWithChildren<StaysSummaryProps>
> = ({
  accommodation,
  checkInDate,
  checkOutDate,
  numRooms,
  supportedLoyaltyProgramme,
  loyaltyProgrammeAccountNumber,
  accommodationSpecialRequests,
  children,
}) => (
  <WithComponentStyles>
    <VSpace space={24} className="duffel-components stays-summary-container">
      <HSpace space={16}>
        <div
          className="stays-summary-photo"
          style={
            accommodation.photos && accommodation.photos.length > 0
              ? { backgroundImage: `url(${accommodation.photos[0].url})` }
              : { backgroundColor: "var(--GREY-100)" }
          }
        >
          {(accommodation.photos?.length ?? 0) === 0 && (
            <Icon name="image_not_supported" color="--GREY-200" size={30} />
          )}
        </div>
        <VSpace space={4}>
          {accommodation.rating && (
            <StaysRating rating={accommodation.rating} />
          )}
          <p className="stays-summary-text--large">{accommodation.name}</p>
          <p className="stays-summary-text--small">
            {accommodation.location.address.line_one},{" "}
            {accommodation.location.address.region ??
              accommodation.location.address.city_name ??
              accommodation.location.address.country_code}
            {accommodation.location.address.postal_code &&
              `, ${accommodation.location.address.postal_code}`}
          </p>
        </VSpace>
      </HSpace>
      <VSpace space={8}>
        <HSpace space={8} alignCenter>
          {numRooms && <p className="stays-summary-stamp">{numRooms}x</p>}
          <p>{accommodation.rooms[0].name}</p>
        </HSpace>
        {accommodation.rooms.length &&
          accommodation.rooms[0].rates.length &&
          accommodation.rooms[0].rates[0].board_type && (
            <HSpace space={12} alignCenter>
              <Icon
                name={boardTypeIcon(accommodation.rooms[0].rates[0].board_type)}
                size={20}
                color="--GREY-700"
              />

              <p>
                {getBoardTypeLabel(accommodation.rooms[0].rates[0].board_type)}
              </p>
            </HSpace>
          )}
      </VSpace>
      <div className="stays-summary-times">
        <div>
          <p className="stays-summary-text--small">Check in</p>
          <p className="stays-summary-text--large">
            {getDateString(checkInDate, "longNoYear").replace(",", "")}
          </p>
          {accommodation.check_in_information && (
            <p className="stays-summary-text--small">
              from {accommodation.check_in_information?.check_in_after_time}
            </p>
          )}
        </div>
        <div className="stays-summary-divider" />
        <div>
          <p className="stays-summary-text--small">Check out</p>
          <p className="stays-summary-text--large">
            {getDateString(checkOutDate, "longNoYear").replace(",", "")}
          </p>
          {accommodation.check_in_information && (
            <p className="stays-summary-text--small">
              until {accommodation.check_in_information.check_out_before_time}
            </p>
          )}
        </div>
      </div>
      {supportedLoyaltyProgramme && loyaltyProgrammeAccountNumber && (
        <VSpace space={8}>
          <p className="stays-summary-text--small">Loyalty number</p>
          <p>
            {LOYALTY_PROGRAMS_NAME_MAP[supportedLoyaltyProgramme]},{" "}
            {loyaltyProgrammeAccountNumber}
          </p>
        </VSpace>
      )}
      {accommodationSpecialRequests && (
        <VSpace space={8}>
          <p className="stays-summary-text--small">Special requests</p>
          <p>{accommodationSpecialRequests}</p>
        </VSpace>
      )}
      {children}
    </VSpace>
  </WithComponentStyles>
);
