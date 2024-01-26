import {
  DuffelCardForm,
  SaveCardData,
  useDuffelCardFormActions,
} from "@duffel/components";
import { Container } from "./common/Container";
import React from "react";

export const SavingCardExample: React.FC<{ clientKey: string }> = ({
  clientKey,
}) => {
  const { ref, saveCard } = useDuffelCardFormActions();
  return (
    <Container title="Save card">
      <DuffelCardForm
        ref={ref} // 1. Setup ref to be able to trigger save card action
        tokenProxyEnvironment={process.env.NEXT_PUBLIC_TOKEN_PROXY_ENV! as any}
        clientKey={clientKey}
        intent="to-save-card"
        onValidateSuccess={() => {
          console.log("validation ok");
        }}
        onSaveCardSuccess={(data: SaveCardData) => {
          console.log("card saved", data); // 3. get the card data and store it
        }}
        onValidateFailure={console.error}
        onSaveCardFailure={console.error}
      />
      <button
        onClick={saveCard} // 2. trigger save card and wait for card to be saved once validation is successfull
      >
        save
      </button>
    </Container>
  );
};
