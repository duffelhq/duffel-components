import {
  DuffelCardForm,
  SaveCardData,
  useDuffelCardFormActions,
} from "@duffel/components";
import { Container } from "./common/Container";

export const SavingCardExample: React.FC<{ clientKey: string }> = ({
  clientKey,
}) => {
  const { actions, triggerSaveCard } = useDuffelCardFormActions();
  return (
    <Container title="Save card">
      <DuffelCardForm
        tokenProxyEnvironment="development"
        clientKey={clientKey}
        intent="to-save-card"
        actions={actions}
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
        onClick={() => {
          triggerSaveCard(); // 2. wait for card to be saved
        }}
      >
        save
      </button>
    </Container>
  );
};
