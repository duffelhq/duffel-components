import React from "react";
import { DuffelCardForm } from "./DuffelCardForm";
import { DuffelCardFormProps } from "./lib/types";
import { useDuffelCardFormActions } from "./lib/useDuffelCardFormActions";

const MOCK_CLIENT_KEY = "fixture_client_key_123";
const MOCK_CARD_ID = "fixture_card_123";

export const SavingCardExampleWithoutHook = () => {
  const [cardFormActions, setCardFormActions] = React.useState<
    DuffelCardFormProps["actions"]
  >(["validate"]); // 1. wait for validation

  return (
    <body>
      <DuffelCardForm
        clientKey={MOCK_CLIENT_KEY}
        intent="to-save-card"
        actions={cardFormActions}
        onValidateSuccess={() => {
          console.log("validation ok");
          setCardFormActions(["validate", "save-card"]); // 2. wait for card to be saved
        }}
        onSaveCardSuccess={(data) => {
          console.log("card saved", data); // 3. get the card data and store it
        }}
        onValidateFailure={console.error}
        onSaveCardFailure={console.error}
      />
    </body>
  );
};

export const SavingCardExample = () => {
  const { actions, triggerSaveCard } = useDuffelCardFormActions();
  return (
    <body>
      <DuffelCardForm
        clientKey={MOCK_CLIENT_KEY}
        intent="to-save-card"
        actions={actions}
        onValidateSuccess={() => {
          console.log("validation ok");
          triggerSaveCard(); // 2. wait for card to be saved
        }}
        onSaveCardSuccess={(data) => {
          console.log("card saved", data); // 3. get the card data and store it
        }}
        onValidateFailure={console.error}
        onSaveCardFailure={console.error}
      />
    </body>
  );
};

export const CreatingTemporaryCardExample = () => {
  const { actions, triggerCreateCardForTemporaryUse } =
    useDuffelCardFormActions();
  return (
    <body>
      <DuffelCardForm
        clientKey={MOCK_CLIENT_KEY}
        intent="to-create-card-for-temporary-use"
        actions={actions}
        onValidateSuccess={() => {
          console.log("validation ok");
          triggerCreateCardForTemporaryUse(); // 1. wait for card to be successfully validated
        }}
        onCreateCardForTemporaryUseSuccess={(data) => {
          console.log("card saved", data); // 2. get the card id and use it to create stays booking or flights order
        }}
        onValidateFailure={console.error}
        onCreateCardForTemporaryUseFailure={console.error}
      />
    </body>
  );
};

export const UsingSavedCardExample = () => {
  const { actions, triggerCreateCardForTemporaryUse } =
    useDuffelCardFormActions();
  return (
    <body>
      <DuffelCardForm
        clientKey={MOCK_CLIENT_KEY}
        intent="to-use-saved-card"
        cardId={MOCK_CARD_ID}
        actions={actions}
        onValidateSuccess={() => {
          console.log("validation ok");
          triggerCreateCardForTemporaryUse(); // 1. wait for card to be successfully validated
        }}
        onCreateCardForTemporaryUseSuccess={(data) => {
          console.log("card saved", data); // 2. get the card id and use it to create stays booking or flights order
        }}
        onValidateFailure={console.error}
        onCreateCardForTemporaryUseFailure={console.error}
      />
    </body>
  );
};

export const SavingAndUsingCardExampleSync = () => {
  const { actions, triggerSaveCard, triggerCreateCardForTemporaryUse } =
    useDuffelCardFormActions();
  return (
    <body>
      <DuffelCardForm
        clientKey={MOCK_CLIENT_KEY}
        intent="to-create-card-for-temporary-use"
        actions={actions}
        onValidateSuccess={() => {
          console.log("validation ok");
          triggerSaveCard(); // 2. wait for card to be saved
        }}
        onSaveCardSuccess={(data) => {
          console.log("card saved", data); // 3. get the card data and store it in your system
          triggerCreateCardForTemporaryUse(); // 4. create a temporary card
        }}
        onCreateCardForTemporaryUseSuccess={(data) => {
          console.log("temporary card created", data); // 5. get the temporary card data and use it to create stays booking or flights order
        }}
        onValidateFailure={console.error}
        onSaveCardFailure={console.error}
        onCreateCardForTemporaryUseFailure={console.error}
      />
    </body>
  );
};

export const SavingAndUsingCardExampleAsync = () => {
  const { actions, triggerSaveCard, triggerCreateCardForTemporaryUse } =
    useDuffelCardFormActions();

  return (
    <body>
      <DuffelCardForm
        clientKey={MOCK_CLIENT_KEY}
        intent="to-create-card-for-temporary-use"
        actions={actions}
        onValidateSuccess={() => {
          console.log("validation ok");
          triggerSaveCard(); // 2. wait for card to be saved
          triggerCreateCardForTemporaryUse(); // 2. create a temporary card, happens independently of the save card
        }}
        onSaveCardSuccess={(data) => {
          console.log("card saved", data); // 3. get the card data and store it in your system
        }}
        onCreateCardForTemporaryUseSuccess={(data) => {
          console.log("temporary card created", data); // 3. get the temporary card data and use it to create stays booking or flights order
        }}
        onValidateFailure={console.error}
        onSaveCardFailure={console.error}
        onCreateCardForTemporaryUseFailure={console.error}
      />
    </body>
  );
};

export const OptionallySavingCardOnCheckoutExample = () => {
  const { actions, triggerSaveCard, triggerCreateCardForTemporaryUse } =
    useDuffelCardFormActions();

  const [cardId, setCardId] = React.useState<string>();

  return (
    <body>
      <DuffelCardForm
        clientKey={MOCK_CLIENT_KEY}
        intent="to-create-card-for-temporary-use"
        actions={actions}
        onValidateSuccess={() => {
          console.log("validation ok");
          triggerCreateCardForTemporaryUse(); // 2. create a temporary card, happens independently of the save card
        }}
        onSaveCardSuccess={(data) => {
          console.log("card saved", data); // 3. get the card data and store it in your system
        }}
        onCreateCardForTemporaryUseSuccess={(data) => {
          console.log("temporary card created", data); // 5. get the temporary card data and use it to create stays booking or flights order
          setCardId(data.id);
        }}
        onValidateFailure={console.error}
        onSaveCardFailure={console.error}
        onCreateCardForTemporaryUseFailure={console.error}
      />
      <label>
        Save card for later use
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              triggerSaveCard(); // 4. Trigger save card if box is checked
            }
          }}
        />
      </label>

      <button
        disabled={!cardId} //
        onClick={() => {
          console.log("User triggered form submission"); //
        }}
      >
        Pay for flight
      </button>
    </body>
  );
};
