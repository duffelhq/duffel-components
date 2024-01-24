import {
  CreateCardForTemporaryUseData,
  DuffelCardForm,
  useDuffelCardFormActions,
} from "@duffel/components";
import { Container } from "./common/Container";

export const CreatingTemporaryCardExample: React.FC<{ clientKey: string }> = ({
  clientKey,
}) => {
  const { actions, triggerCreateCardForTemporaryUse } =
    useDuffelCardFormActions();
  return (
    <Container title="Create card for temporary use">
      <DuffelCardForm
        tokenProxyEnvironment="development"
        clientKey={clientKey}
        intent="to-create-card-for-temporary-use"
        actions={actions}
        onValidateSuccess={() => {
          console.log("validation ok");
        }}
        onCreateCardForTemporaryUseSuccess={(
          data: CreateCardForTemporaryUseData,
        ) => {
          console.log("card created for temporary use", data); // 2. get the card id and use it to create stays booking or flights order
        }}
        onValidateFailure={console.error}
        onCreateCardForTemporaryUseFailure={console.error}
      />
      <button
        onClick={
          () => triggerCreateCardForTemporaryUse() // 1. wait for card to be successfully validated
        }
      >
        Click to pay
      </button>
    </Container>
  );
};
