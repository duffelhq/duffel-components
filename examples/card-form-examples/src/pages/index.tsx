import { SavingAndUsingCardExample } from "@/components/5_SavingAndUsingCardExample";
import { SavingCardExampleWithoutHook } from "../components/1_SavingCardExampleWithoutHook";
import { SavingCardExample } from "../components/2_SavingCardExample";
import { CreatingTemporaryCardExample } from "../components/3_CreatingTemporaryCardExample";
import { UsingSavedCardExample } from "../components/4_UsingSavedCardExample";
import React from "react";

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
    },
  );

  const responseBody = await response.json();
  return { props: { clientKey: responseBody.data.component_client_key } };
};

export default function IndexPage({ clientKey }: Props) {
  return (
    <div>
      <SavingCardExampleWithoutHook clientKey={clientKey} />
      <SavingCardExample clientKey={clientKey} />
      <CreatingTemporaryCardExample clientKey={clientKey} />
      <UsingSavedCardExample clientKey={clientKey} />
      <SavingAndUsingCardExample clientKey={clientKey} />
    </div>
  );
}
