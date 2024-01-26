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
  const { ref, createCardForTemporaryUse } = useDuffelCardFormActions();

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
          The card component will appear once a valid card ID is added to the
          input
        </p>
      ) : (
        <>
          <DuffelCardForm
            ref={ref}
            tokenProxyEnvironment={
              process.env.NEXT_PUBLIC_TOKEN_PROXY_ENV! as any
            }
            clientKey={clientKey}
            savedCardData={{
              id: cardId,
              brand: "visa", // you must get this from the save card response
            }}
            intent="to-use-saved-card"
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
            onClick={createCardForTemporaryUse} // 1. wait for card to be successfully validated
          >
            Pay with saved card
          </button>
        </>
      )}
    </Container>
  );
};
