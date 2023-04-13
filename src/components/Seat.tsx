import classNames from "classnames";
import * as React from "react";
import { SeatInfo } from "./SeatInfo";
import { SeatMapCabinRowSectionElementSeat } from "src/types/SeatMap";
import {
  ExtendedSeatInfo,
  SeatSelectionPassenger,
  useSeatSelectionContext,
} from "@lib/useSeatSelectionContext";
import { useViewportWidth } from "@lib/useViewPortWidth";
import { usePassengersContext } from "@lib/usePassengersContext";
import { getServiceInformation } from "@lib/get-service-information";
import { moneyStringFormatter } from "@lib/formatConvertedCurrency";
import { isMobileOrTablet } from "@lib/isMobileOrTablet";
import { Icon } from "./Icon";

export interface SeatProps {
  /**
   * The seat information.
   */
  seat: SeatMapCabinRowSectionElementSeat;
}

const getPassengerInitials = (
  passengers: SeatSelectionPassenger[],
  selectedBy: string | undefined
) => {
  if (!selectedBy) return false;
  let passengerInitials = "";
  passengers.forEach((passenger, index) => {
    if (passenger.name) {
      const rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

      const initials = [...passenger.name.matchAll(rgx)] || [];

      if (passenger.id === selectedBy) {
        return (passengerInitials = (
          (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
        ).toUpperCase());
      }
    }
    if (passenger.id === selectedBy)
      return (passengerInitials = `P${index + 1}`);
  });
  return passengerInitials;
};

/**
 * A seat on the seat map.
 */
export const Seat: React.FC<SeatProps> = ({ seat }) => {
  const width = useViewportWidth();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const passengerContext = usePassengersContext();
  const {
    seatSelection,
    currentSeat,
    setCurrentSeat,
    onSelectSeat,
    extendedSeatInfo,
    setExtendedSeatInfo,
  } = useSeatSelectionContext();

  if (!passengerContext) {
    throw new Error("Seat has to be used under PassengersProvider");
  }

  const { passengers, selectedPassenger, selectedSegment } = passengerContext;
  const { service, isAvailable, selectedBy } = getServiceInformation(
    seat,
    selectedPassenger.id,
    seatSelection[selectedSegment.id]
  );
  const passenger = getPassengerInitials(passengers, selectedBy);
  const price = `${
    service &&
    moneyStringFormatter(service.total_currency)(+service.total_amount)
  }`;
  const isFeePayable =
    service?.total_amount && parseInt(service?.total_amount) !== 0;
  const selectedByOther = selectedBy && selectedBy !== selectedPassenger.id;

  const updateExtendedSeatInfo = (seat: ExtendedSeatInfo) => {
    if (seat !== null) {
      const {
        segment,
        seat: { designator },
      } = seat;

      const seatInfo = extendedSeatInfo
        .map((previousSeats) => previousSeats)
        .find(
          (previousSeat) =>
            previousSeat.segment === segment &&
            previousSeat.seat.designator === designator
        );

      if (!seatInfo) {
        service &&
          setExtendedSeatInfo([...extendedSeatInfo, { ...seat, service }]);
      } else {
        setExtendedSeatInfo(
          extendedSeatInfo.splice(
            extendedSeatInfo.findIndex(
              (previousSeat) =>
                previousSeat.segment !== segment &&
                previousSeat.seat.designator !== designator
            )
          )
        );
      }
    }
  };
  return (
    <>
      {selectedBy || isAvailable ? (
        <button
          id={seat.designator}
          type="button"
          className={classNames("map-element", "map-element__seat", {
            "map-element--available": isAvailable && !selectedBy,
            "map-element--selected": selectedBy,
            "map-element--actionable":
              isAvailable || selectedBy == selectedPassenger.id,
          })}
          onClick={(e) => {
            service &&
              updateExtendedSeatInfo({
                segment: selectedSegment.id,
                seat,
                service,
              });

            if (isMobileOrTablet(width) && !selectedByOther) {
              // We need all the ? here since we actually get `seat=false` as prop somehow and we haven't got time to look into that yet.
              // Also we ultimately should use `seat.id` to compare but we don't have the capacity to update the types + mocks
              // to be up-to-date yet, so we will need to use the designator for now.
              currentSeat?.seat?.designator === seat?.designator
                ? setCurrentSeat({ seat: null, service: undefined })
                : setCurrentSeat({ seat, service });
            }

            if (service && !selectedByOther) {
              onSelectSeat(
                selectedBy === selectedPassenger.id
                  ? null
                  : { designator: seat.designator, service }
              );
              const target = e.target as any;
              target.blur();
            }
          }}
          onMouseEnter={() =>
            !isMobileOrTablet(width) && setIsPopoverOpen(true)
          }
          onMouseLeave={() =>
            !isMobileOrTablet(width) && setIsPopoverOpen(false)
          }
          aria-label={`${seat.designator} ${seat.name || "Seat"} ${price}`}
        >
          {isFeePayable && (
            <Icon
              name="seat_paid_indicator"
              className="map-element--fee-payable"
              size={isMobileOrTablet(width) ? 16 : 24}
            />
          )}
          {selectedBy
            ? passenger
            : seat.designator.charAt(seat.designator.length - 1)}
          {isPopoverOpen &&
            !selectedByOther &&
            service &&
            !isMobileOrTablet(width) && (
              <SeatInfo seat={seat} service={service} />
            )}
        </button>
      ) : (
        <span
          className="map-element map-element__seat"
          aria-label={`${seat.designator} ${seat.name || "Seat"} Unavailable`}
        >
          <Icon name="close" size={isMobileOrTablet(width) ? 14 : 16} />
        </span>
      )}
    </>
  );
};
