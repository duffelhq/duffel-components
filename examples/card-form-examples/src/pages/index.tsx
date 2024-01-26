import { SavingCardExample } from "@/components/1_SavingCardExample";
import { CreatingTemporaryCardExample } from "@/components/2_CreatingTemporaryCardExample";
import { UsingSavedCardExample } from "@/components/3_UsingSavedCardExample";
import { SavingAndUsingCardExample } from "@/components/4_SavingAndUsingCardExample";

interface Props {
  clientKey: string;
}

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.DUFFEL_API_ORIGIN}/identity/component_client_keys`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "duffel-version": "v1",
        Authorization: `Bearer ${process.env.DUFFEL_API_KEY}`,
      },
    }
  );

  const responseBody = await response.json();
  return { props: { clientKey: responseBody.data.component_client_key } };
};

export default function IndexPage({ clientKey }: Props) {
  return (
    <div>
      <SavingCardExample clientKey={clientKey} />
      <CreatingTemporaryCardExample clientKey={clientKey} />
      <UsingSavedCardExample clientKey={clientKey} />
      <SavingAndUsingCardExample clientKey={clientKey} />
    </div>
  );
}
