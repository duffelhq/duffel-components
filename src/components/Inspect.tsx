interface InspectProps {
  props: Record<string, any>;
  state: Record<string, any>;
}

export const Inspect: React.FC<InspectProps> = ({ props, state }) => (
  <pre
    style={{
      border: "solid 1px black",
      padding: "12px",
      overflowX: "scroll",
    }}
  >
    <>
      <b>{"Properties:\n"}</b>
      {Object.entries(props).map(
        ([key, value]) =>
          `${value ? "✓" : "x"} ${key}: ${JSON.stringify(value)}\n`
      )}

      <b>{"\nInternal state:\n"}</b>
      {Object.entries(state).map(
        ([key, value]) =>
          `${value ? "✓" : "x"} ${key}: ${JSON.stringify(value)}\n`
      )}
    </>
  </pre>
);
