import {
  CreateCardForTemporaryUseData,
  DuffelCardForm,
  useDuffelCardFormActions,
} from "@duffel/components";
import { Container } from "./common/Container";

export const CreatingTemporaryCardExample: React.FC<{ clientKey: string }> = ({
  clientKey,
}) => {
  const { ref, createCardForTemporaryUse } = useDuffelCardFormActions();
  return (
    <Container title="Create card for temporary use">
      <DuffelCardForm
        ref={ref}
        tokenProxyEnvironment={process.env.NEXT_PUBLIC_TOKEN_PROXY_ENV! as any}
        clientKey={clientKey}
        intent="to-create-card-for-temporary-use"
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
        onClick={createCardForTemporaryUse} // 1. wait for card to be successfully validated
      >
        Click to pay
      </button>
    </Container>
  );
};
