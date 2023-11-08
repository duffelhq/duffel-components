import * as React from "react";

export interface ResultsPageProps {
  data: { itineraries: Record<string, any>[] };
  onSelect: (id: string) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ data, onSelect }) => {
  if (!data) {
    return <div>No data</div>;
  }

  if (!data.itineraries) {
    return <div>No itineraries</div>;
  }

  if (data.itineraries.length === 0) {
    return <div>Empty list of itineraries</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        padding: "16px",
      }}
    >
      <ul style={{ width: "350px" }}>
        {data &&
          data.itineraries &&
          data.itineraries.map((itinerary) => (
            <li key={itinerary.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "8px",
                }}
              >
                <span>{itinerary.id}</span>
                <button onClick={() => onSelect(itinerary.id)}>Select</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
