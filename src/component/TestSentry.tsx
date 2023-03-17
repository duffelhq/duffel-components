import * as React from "react";

export const TestSentry: React.FC = () => {
  const toRender: any = {
    this_will_error: "because you can't render an object",
  };

  return <div>{toRender}</div>;
};
