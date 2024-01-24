import React from "react";
import {
  DuffelCardForm,
  DuffelCardFormProps,
  SaveCardData,
} from "@duffel/components";
import { Container } from "./common/Container";

export const SavingCardExampleWithoutHook: React.FC<{ clientKey: string }> = ({
  clientKey,
}) => {
  const [cardFormActions, setCardFormActions] = React.useState<
    DuffelCardFormProps["actions"]
  >(["validate"]); // 1. wait for validation

  return (
    <Container title="Save card (without hook)">
      <DuffelCardForm
        tokenProxyEnvironment="development"
        clientKey={clientKey}
        intent="to-save-card"
        actions={cardFormActions}
        onValidateSuccess={() => {
          console.log("validation ok");
          setCardFormActions(["validate", "save-card"]); // 2. wait for card to be saved
        }}
        onSaveCardSuccess={(data: SaveCardData) => {
          console.log("card saved", data); // 3. get the card data and store it
        }}
        onValidateFailure={console.error}
        onSaveCardFailure={console.error}
      />
    </Container>
  );
};
