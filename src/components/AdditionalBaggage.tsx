import { BaggageDisplay } from "@components/BaggageDisplay";
import { Counter } from "@components/Counter";
import { Icon } from "@components/Icon";
import { formatConvertedCurrency } from "@lib/formatConvertedCurrency";
import * as React from "react";
import { CurrencyConversion } from "src/types/CurrencyConversion";
import { OfferAvailableService } from "src/types/Offer";

export type Baggage = {
  id: string;
  quantity: number;
};

export interface AdditionalBaggageProps {
  /**
   * List of available services in the offer
   */
  availableServices: OfferAvailableService[];
  /**
   * List of current additional baggages
   */
  additionalBaggages: Baggage[];
  /**
   * onChange handler responsible to get the services object to send to the API
   */
  onChange: (updatedBaggages: Baggage[], lastBaggageUpdated: Baggage) => void;
  /**
   * Optional currency conversion to enable prices to be shown in an alternative currency
   */
  currencyConversion?: CurrencyConversion;
}

const updateBaggageServiceQuantity = (
  services: Baggage[],
  serviceId: string,
  newQuantity: number
): Baggage[] => {
  if (!services.find((service) => service.id === serviceId)) {
    return [
      ...services,
      {
        id: serviceId,
        quantity: newQuantity,
      },
    ];
  }

  return services.map((service) =>
    service.id === serviceId
      ? {
          ...service,
          quantity: newQuantity,
        }
      : service
  );
};

export const AdditionalBaggage: React.FC<AdditionalBaggageProps> = ({
  availableServices,
  additionalBaggages = [],
  onChange,
  currencyConversion,
}) => {
  const baggageServices = availableServices.filter(
    ({ type, metadata }) => type === "baggage" && metadata
  );
  if (!baggageServices.length) {
    return (
      <div className="baggage-selection__no-bag">
        <div className="baggage-selection__no-bag-circle">
          <Icon name="no_bag" className="baggage-selection__no-bag-icon" />
        </div>
        <div>Extra bags are not available for this flight</div>
      </div>
    );
  }

  return (
    <div className="duffel-components">
      {baggageServices.map(
        ({
          metadata,
          id,
          total_amount: totalAmount,
          total_currency: totalCurrency,
          maximum_quantity: maximumQuantity,
        }) => (
          <div key={id} className="baggage-selection__control-container">
            <BaggageDisplay
              key={id}
              metadata={metadata}
              price={formatConvertedCurrency(
                totalAmount,
                currencyConversion?.currency ?? totalCurrency,
                currencyConversion?.rate
              )}
            />
            <div className="baggage-selection__control">
              <Counter
                id={`baggage-selection-counter-${id}`}
                min={0}
                max={maximumQuantity}
                value={
                  additionalBaggages.find((baggage) => baggage.id === id)
                    ?.quantity ?? 0
                }
                onChange={(quantity) => {
                  const updatedBaggages = updateBaggageServiceQuantity(
                    additionalBaggages,
                    id,
                    quantity
                  );
                  return onChange(updatedBaggages, {
                    id,
                    quantity,
                  });
                }}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};
