import {
  CreateCardForTemporaryUseData,
  DuffelCardForm,
  SaveCardData,
  useDuffelCardFormActions,
} from "@duffel/components";
import React from "react";
import { Container } from "./common/Container";

export const SavingAndUsingCardExample: React.FC<{ clientKey: string }> = ({
  clientKey,
}) => {
  const { actions, triggerSaveCard, triggerCreateCardForTemporaryUse } =
    useDuffelCardFormActions();

  return (
    <Container title="Save and use card with checkbox">
      <DuffelCardForm
        tokenProxyEnvironment="development"
        clientKey={clientKey}
        intent="to-create-card-for-temporary-use"
        actions={actions}
        onValidateSuccess={() => {
          console.log("validation ok");
        }}
        onSaveCardSuccess={(data: SaveCardData) => {
          console.log("card saved", data); // 2. get the card data and store it in your system
        }}
        onCreateCardForTemporaryUseSuccess={(
          data: CreateCardForTemporaryUseData,
        ) => {
          console.log("temporary card created", data); // 5. get the temporary card data and use it to create stays booking or flights order
        }}
        onValidateFailure={console.error}
        onSaveCardFailure={console.error}
        onCreateCardForTemporaryUseFailure={console.error}
      />

      <div>
        <label>
          Save card for later use
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                triggerSaveCard(); // 1. If user chooses to save for later, trigger save card action
              }
            }}
          />
        </label>
      </div>

      <div>
        <button
          onClick={() => {
            console.log("User triggered form submission"); // 3. User triggers form submission
            triggerCreateCardForTemporaryUse(); // 4. wait for card to be successfully validated
          }}
        >
          Pay for flight
        </button>
      </div>
    </Container>
  );
};
