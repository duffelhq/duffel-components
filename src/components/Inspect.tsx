interface InspectProps {
  data: Record<string, any>;
}

export const Inspect: React.FC<InspectProps> = ({
  data: {
    offer_id,
    client_key,
    passengers,
    baggageSelectedServices,
    offer,
    error,
    seatMap,
  },
}) => (
  <pre
    style={{
      border: "solid 1px black",
      padding: "12px",
      overflowX: "scroll",
    }}
  >
    <>
      <b>{"Attributes:\n"}</b>
      {`${offer_id ? "✓" : "x"} offer_id: ${offer_id}\n`}
      {`${client_key ? "✓" : "x"} client_key: ${client_key}\n\n`}

      <b>{"Init data:\n"}</b>
      {`${passengers ? "✓" : "x"} passengers: ${JSON.stringify(
        passengers
      )}\n\n`}

      <b>{"Internal state:\n"}</b>
      {`${offer ? "✓" : "x"} offer: ${
        JSON.stringify(offer) || (error ? "Failed" : "Loading...")
      }\n`}
      {`${seatMap ? "✓" : "x"} seatMap: ${
        JSON.stringify(seatMap) || (error ? "Failed" : "Loading...")
      }\n`}
      {`${
        baggageSelectedServices ? "✓" : "x"
      } baggageSelectedServices: ${JSON.stringify(
        baggageSelectedServices
      )}\n\n`}
      <b>{"Error:\n"}</b>
      {`${error ? "✓" : "x"} error: ${error}\n`}
    </>
  </pre>
);
