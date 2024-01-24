import {
  CreateCardForTemporaryUseData,
  DuffelCardForm,
  useDuffelCardFormActions,
} from "@duffel/components";
import React from "react";
import { Container } from "./common/Container";

export const UsingSavedCardExample: React.FC<{ clientKey: string }> = ({
  clientKey,
}) => {
  const [cardId, setCardId] = React.useState<string>("");
  const { actions, triggerCreateCardForTemporaryUse } =
    useDuffelCardFormActions();

  return (
    <Container title="Use saved card">
      <input
        placeholder="paste a saved card id here"
        value={cardId}
        onChange={(e) => {
          setCardId(e.target.value);
        }}
      />
      {cardId.length !== 26 ? (
        <p>
          The card component will appear once a valid card Id is added to the
          input
        </p>
      ) : (
        <>
          <DuffelCardForm
            tokenProxyEnvironment="development"
            clientKey={clientKey}
            savedCardData={
              {
               id: cardId,
               brand: "visa", // you must get this from the save card response
              }
            }
            intent="to-use-saved-card"
            actions={actions}
            onValidateSuccess={() => {
              console.log("validation ok");
            }}
            onCreateCardForTemporaryUseSuccess={(
              data: CreateCardForTemporaryUseData,
            ) => {
              console.log("card saved", data); // 2. get the card id and use it to create stays booking or flights order
            }}
            onValidateFailure={console.error}
            onCreateCardForTemporaryUseFailure={console.error}
          />
          <button
            onClick={() => {
              triggerCreateCardForTemporaryUse(); // 1. wait for card to be successfully validated
            }}
          >
            Pay with saved card
          </button>
        </>
      )}
    </Container>
  );
};
