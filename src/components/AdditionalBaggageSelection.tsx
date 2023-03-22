import React from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { formatConvertedCurrency } from "@lib/formatConvertedCurrency";
import {
  PassengersProvider,
  usePassengersContext,
} from "@lib/usePassengersContext";
import { CurrencyConversion } from "src/types/CurrencyConversion";
import {
  LayoutSelectionPassenger,
  Offer,
  OfferAvailableServiceBaggage,
} from "src/types/Offer";
import { ErrorBoundary } from "@components/ErrorBoundary";
import { PassengersLayout } from "@components/PassengersLayout";
import { AdditionalBaggage } from "@components/AdditionalBaggage";

export interface AdditionalBaggageSelectionCommonProps {
  /**
   * List of all passengers that will be purchasing baggages
   */
  passengers: LayoutSelectionPassenger[];
  /**
   * What to do when the user presses the Confirm button
   */
  onSubmit: (baggages: Baggage[]) => void;
  /**
   * Already selected baggages to initialize the component with
   */
  initialBaggageSelection?: Baggage[];
  /**
   * Optional currency conversion to enable prices to be shown in an alternative currency
   */
  currencyConversion?: CurrencyConversion;
}

export interface AdditionalBaggageSelectionOfferProps
  extends AdditionalBaggageSelectionCommonProps {
  /**
   * The offer we are selecting additional baggages for
   */
  offer: Offer;
}

export interface AdditionalBaggageSelectionServicesProps
  extends AdditionalBaggageSelectionCommonProps {}

// TODO: figure out how this fits
type Baggage = any;

const AdditionalBaggageSelect: React.FC<
  Omit<AdditionalBaggageSelectionProps, "passengers">
> = ({ offer, onSubmit, initialBaggageSelection, currencyConversion }) => {
  const passengersContext = usePassengersContext();
  const [additionalBaggages, setAdditionalBaggages] = React.useState<Baggage[]>(
    initialBaggageSelection ?? []
  );

  let baggageServiceAppliesToAllSegments = true;

  if (!passengersContext) {
    throw new Error(
      "AdditionalBaggageSelect must be used within PassengersContext"
    );
  }

  if (!offer) {
    throw new Error(
      "AdditionalBaggageSelect must have either an offer or order and available services"
    );
  }
  const { selectedPassenger, selectedSegment } = passengersContext;
  let baggageServicesToDisplay: OfferAvailableServiceBaggage[] = [];
  if (offer) {
    baggageServicesToDisplay = offer.available_services.filter(
      (service) =>
        service.passenger_ids.includes(selectedPassenger.id) &&
        service.segment_ids.includes(selectedSegment.id) &&
        service.type === "baggage"
    );
  }

  const baggageServiceIds = baggageServicesToDisplay?.map((b) => b.id);
  const baggagesToDisplay = additionalBaggages.filter((b) =>
    baggageServiceIds?.includes(b.id)
  );

  const totalBaggagesAdded = additionalBaggages.reduce(
    (quantity, baggage) => quantity + baggage.quantity,
    0
  );

  let baggagePriceById: Record<string, number>;

  if (offer) {
    baggagePriceById = offer.available_services.reduce(
      (priceById, baggage) => ({
        ...priceById,
        [baggage.id]: +baggage.total_amount,
      }),
      {}
    );
  }

  const currency =
    currencyConversion?.currency && currencyConversion?.rate
      ? currencyConversion.currency
      : offer.total_currency;

  const totalAmount = additionalBaggages
    .map((baggage) => baggage.quantity * baggagePriceById[baggage.id])
    .reduce((acc, amount) => acc + amount, 0)
    .toString();

  const formattedAmount = formatConvertedCurrency(
    totalAmount,
    currency!,
    currencyConversion?.rate ?? 1
  );

  // Determine whether each baggage service is contained in every segment in the itinerary

  const offerSegmentIds = offer.slices.flatMap((slice) =>
    slice.segments.flatMap((segment) => segment.id)
  );

  offer.available_services.forEach((availableService) => {
    if (
      JSON.stringify(availableService.segment_ids) !=
      JSON.stringify(offerSegmentIds)
    ) {
      baggageServiceAppliesToAllSegments = false;
    }
  });

  return (
    <PassengersLayout
      renderPassengerSelectionDetails={(passengerId, segmentId) => {
        const baggageIds = offer.available_services
          .filter(
            (service) =>
              service.passenger_ids.includes(passengerId) &&
              service.segment_ids.includes(segmentId) &&
              service.type === "baggage"
          )
          .map((b) => b.id);

        const baggagesAdded = additionalBaggages
          .filter((b) => baggageIds?.includes(b.id))
          .reduce((total, b) => total + b.quantity, 0);

        return `${baggagesAdded} bag${baggagesAdded !== 1 ? "s" : ""} added`;
      }}
      summaryTitle={`${totalBaggagesAdded} bag${
        totalBaggagesAdded !== 1 ? "s" : ""
      } added`}
      formattedTotalAmount={formattedAmount}
      onSubmit={() => onSubmit(additionalBaggages)}
    >
      <div className="additional-baggage-select">
        <div className="additional-baggage-select--container">
          <div className="additional-baggage-select__title">
            Purchase additional baggage
          </div>
          {baggageServiceAppliesToAllSegments && (
            <div className="additional-baggage-select__notice">
              Bags selected will be applied to all flights in this itinerary
            </div>
          )}
          <AdditionalBaggage
            availableServices={baggageServicesToDisplay}
            additionalBaggages={baggagesToDisplay}
            onChange={(updatedBaggages) => {
              /**
               * Since AdditionalBaggageSelect consumes the AdditionalBaggageSelect component, we need to make sure to update the
               * metadata.duffel_component_used field to reflect that the AdditionalBaggageSelect component was used if the baggage
               * service was modified via the AdditionalBaggage component (overriding the 'additional_baggage' value set via the
               * AdditionalBaggage component)
               */
              const updatedBaggagesWithAdditionalBaggageSelectMetadata =
                updatedBaggages.map<Baggage>(
                  (updatedBaggageService: Baggage) => {
                    if (
                      updatedBaggageService.metadata?.duffel_component_used !==
                      "additional_baggage"
                    ) {
                      return updatedBaggageService;
                    }

                    return {
                      ...updatedBaggageService,
                      metadata: {
                        ...updatedBaggageService.metadata,
                        duffel_component_used: "additional_baggage_selection",
                      },
                    };
                  }
                );

              setAdditionalBaggages((prev) => [
                // change in selected baggages
                ...prev.map(
                  (baggage) =>
                    updatedBaggagesWithAdditionalBaggageSelectMetadata.find(
                      (b) => b.id === baggage.id
                    ) ?? baggage
                ),
                // new baggages selected
                ...updatedBaggagesWithAdditionalBaggageSelectMetadata.filter(
                  (baggage) => !prev.find((b) => b.id === baggage.id)
                ),
              ]);
            }}
            currencyConversion={currencyConversion}
          />
        </div>
      </div>
    </PassengersLayout>
  );
};

interface AdditionalBaggageSelectionProps {
  /**
   * The offer we are selecting additional baggages for
   */
  offer: Offer;

  /**
   * The passengers that should be used to create the order later
   */
  passengers: CreateOrderPayload["passengers"];

  /**
   * TODO: fix type
   */
  onSubmit: (data: CreateOrderPayloadServices) => void;

  /**
   * TODO: fix type
   */
  initialBaggageSelection: Baggage;

  /**
   * How much to multiply total values by
   * @default = 1
   */
  currencyConversion?: CurrencyConversion;
}

export const AdditionalBaggageSelection: React.FC<AdditionalBaggageSelectionProps> =
  (props) => {
    if (!props.offer) {
      throw new Error(
        "Not possible to render AdditionalBaggageSelection, the offer is missing."
      );
    }
    let segments: any = props.offer.slices.map((s) => s.segments).flat();

    return (
      <ErrorBoundary>
        <PassengersProvider passengers={props.passengers} segments={segments}>
          <AdditionalBaggageSelect {...props} />
        </PassengersProvider>
      </ErrorBoundary>
    );
  };
