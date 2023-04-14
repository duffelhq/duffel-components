import { ErrorBoundary } from "@components/ErrorBoundary";
import { convertDurationToString } from "@lib/convert-duration-to-string";
import { moneyStringFormatter } from "@lib/formatConvertedCurrency";
import { getSeatServices } from "@lib/getSeatServices";
import { isElementVisible } from "@lib/isElementVisible";
import {
  PassengersProvider,
  usePassengersContext,
} from "@lib/usePassengersContext";
import {
  CurrentSeat,
  ExtendedSeatInfo,
  SeatSelectionContext,
  SeatSelectionContextInterface,
  Size,
} from "@lib/useSeatSelectionContext";
import * as React from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import {
  SeatMap,
  SeatMapCabinRowSectionAvailableService,
} from "src/types/SeatMap";
import { LoadingState } from "./LoadingState";
import { PassengersLayout } from "./PassengersLayout";
import { SeatInfo } from "./SeatInfo";
import { SeatMap as SeatMapComponent } from "./SeatMap";
import { getSeatSelectionContextInterfaceFromServices } from "@lib/getSeatSelectionContextInterfaceFromServices";

export interface SeatSelectionProps {
  offer: Offer;
  seatMaps: SeatMap[];
  passengers: CreateOrderPayload["passengers"];
  selectedServices: CreateOrderPayloadServices;
  onClose: (selectedServices: SeatSelectionContextInterface) => void;
}

export const SeatSelection: React.FC<SeatSelectionProps> = (props) => (
  <ErrorBoundary>
    <PassengersProvider
      passengers={props.passengers}
      segments={props.offer.slices
        .map((slice) => slice.segments)
        .flat()
        .filter((segment) => {
          const segmentIds = props.seatMaps.map(
            (seatMap) => seatMap.segment_id
          );
          return segmentIds.includes(segment.id);
        })}
    >
      <SeatSelect {...props} />
    </PassengersProvider>
  </ErrorBoundary>
);

const SeatSelect: React.FC<Omit<SeatSelectionProps, "passengers">> = ({
  seatMaps,
  offer,
  onClose,
  selectedServices,
}) => {
  const passengersContext = usePassengersContext();

  const [seatSelection, setSeatSelection] =
    React.useState<SeatSelectionContextInterface>(
      getSeatSelectionContextInterfaceFromServices(selectedServices, seatMaps)
    );
  const [size, setSize] = React.useState<Size>("default");
  const [currentSeatSelected, setCurrentSeatSelected] =
    React.useState<CurrentSeat>({ seat: null, service: undefined });
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [extendedSeatInfo, setExtendedSeatInfo] = React.useState<
    ExtendedSeatInfo[]
  >([]);

  React.useMemo(() => {
    if (!passengersContext?.segments) {
      return;
    }

    if (Object.keys(seatSelection).length <= 0) {
      const initialiseData = new Map(
        passengersContext?.segments.map((segment) => {
          const passengerId = new Map(
            segment.passengers.map((passenger) => [
              passenger.passenger_id,
              null,
            ])
          );
          return [
            segment.id,
            Object.fromEntries(
              new Map(
                [...passengerId.entries()].sort((a, b) =>
                  a[0].localeCompare(b[0])
                )
              )
            ),
          ];
        })
      );
      const data = Object.fromEntries(initialiseData);
      if (data) {
        setSeatSelection(data);
      }
    }
  }, [passengersContext?.segments, seatSelection]);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && size !== "small") {
        setSize("small");
      } else if (window.innerWidth >= 1024 && size !== "default") {
        setSize("default");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size]);

  // show loading state if the segment changes
  React.useEffect(() => {
    setIsLoading(true);
  }, [passengersContext?.selectedSegment]);

  // whenever the selected passenger or selected segment changes, ensure that the selected
  // seat is scrolled into view and the mobile view is shown properly
  React.useEffect(() => {
    if (!passengersContext) {
      return;
    }

    const { selectedSegment, selectedPassenger } = passengersContext;

    const seat =
      seatSelection[selectedSegment.id] &&
      seatSelection[selectedSegment.id][selectedPassenger.id];

    if (seat && seat.designator !== null) {
      const selectedSeat = document.getElementById(seat.designator);
      if (selectedSeat && !isElementVisible(selectedSeat))
        selectedSeat?.scrollIntoView({ behavior: "smooth", block: "center" });

      const seatInfo = extendedSeatInfo.find(
        (seatInfo) =>
          seatInfo.segment === selectedSegment.id &&
          seatInfo.seat.designator === seat.designator
      );

      if (seatInfo) {
        setCurrentSeatSelected({
          seat: seatInfo.seat,
          service: seatInfo.service,
        });
      }
    }
  }, [passengersContext, extendedSeatInfo, seatSelection]);

  if (
    !passengersContext ||
    !passengersContext.passengers.length ||
    !passengersContext.segments.length
  ) {
    return null;
  }

  const { selectedSegment, selectedPassenger, segments } = passengersContext;

  const selectSeatForSelectedPassenger = (
    seatId: {
      designator: string;
      service: SeatMapCabinRowSectionAvailableService;
    } | null
  ) => {
    const newSelectedSeatIds = Object.assign({}, seatSelection, {
      [selectedSegment.id]: Object.assign(
        {},
        seatSelection[selectedSegment.id],
        {
          [selectedPassenger.id]: { ...seatId },
        }
      ),
    });
    setSeatSelection(newSelectedSeatIds);
  };

  const renderMobileSeatInfo = () => {
    const { seat, service } = currentSeatSelected;
    return seat !== null &&
      seatSelection[selectedSegment.id] &&
      seatSelection[selectedSegment.id][selectedPassenger.id] !== null ? (
      <div className="seat-selection__mobile-seat-info">
        <SeatInfo seat={seat} service={service} />
      </div>
    ) : null;
  };

  const renderLoadingState = () => {
    const origin = selectedSegment.origin.iata_code || "";
    const destination = selectedSegment.destination.iata_code || "";
    const duration =
      (selectedSegment.duration &&
        convertDurationToString(selectedSegment.duration)) ||
      "";

    return (
      <LoadingState
        origin={origin}
        destination={destination}
        duration={duration}
        done={() => setIsLoading(false)}
      />
    );
  };

  const renderPassengerSelectionDetails = (
    passengerId: string,
    segmentId: string
  ) => {
    const seat =
      seatSelection[segmentId] && seatSelection[segmentId][passengerId];

    return seat && seat.service ? (
      <span className="passenger-selection-passenger__action">
        <span className="passenger-selection-passenger__seat-designator">
          {seat.designator}
        </span>
        <span className="passenger-selection-passenger__seat-price">
          {moneyStringFormatter(seat.service.total_currency)(
            +seat.service.total_amount
          )}
        </span>
      </span>
    ) : (
      <span className="passenger-selection-passenger__action">Unselected</span>
    );
  };

  const renderSeatMap = (isLoading: boolean): React.ReactNode =>
    isLoading ? (
      renderLoadingState()
    ) : (
      <ErrorBoundary>
        <SeatMapComponent />
      </ErrorBoundary>
    );

  // these values are used to render summary text
  const services = getSeatServices(seatSelection);
  const numberOfSeats = segments.reduce(
    (total, segment) => total + segment.passengers.length,
    0
  );

  const numberOfServices = services && services.length;
  const currency = offer.total_currency;
  const formattedAmount =
    numberOfServices > 0
      ? moneyStringFormatter(services[0].total_currency)(
          services.reduce((total, service) => total + +service.total_amount, 0)
        )
      : offer
      ? moneyStringFormatter(currency)(0)
      : "0";

  return (
    <SeatSelectionContext.Provider
      value={{
        offer,
        seatMaps,
        seatSelection,
        size,
        onSelectSeat: selectSeatForSelectedPassenger,
        currentSeat: currentSeatSelected,
        setCurrentSeat: setCurrentSeatSelected,
        setIsLoading,
        extendedSeatInfo,
        setExtendedSeatInfo,
        currency,
      }}
    >
      <PassengersLayout
        renderPassengerSelectionDetails={renderPassengerSelectionDetails}
        mobileOnlyContent={renderMobileSeatInfo()}
        summaryTitle={`${numberOfServices} of ${numberOfSeats} seat${
          numberOfSeats > 1 ? "s" : ""
        } selected`}
        formattedTotalAmount={formattedAmount}
        onSubmit={() => onClose(seatSelection)}
      >
        {renderSeatMap(isLoading)}
      </PassengersLayout>
    </SeatSelectionContext.Provider>
  );
};
