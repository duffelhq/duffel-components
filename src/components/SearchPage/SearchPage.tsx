import * as React from "react";

export interface SearchPageProps {
  data: { suggestions: string[] };
  getSuggestions: (value: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  data,
  getSuggestions,
}) => {
  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridColumnGap: "8px",
        gridRowGap: "8px",
        padding: "16px",
      }}
    >
      <label>From</label>
      <input
        list="suggestions"
        name="from"
        id="from"
        onChange={(e) => getSuggestions(e.target.value)}
      ></input>
      <label>To</label>
      <input
        list="suggestions"
        name="to"
        id="to"
        onChange={(e) => getSuggestions(e.target.value)}
      ></input>
      <datalist id="suggestions">
        {data.suggestions.map((suggestion) => (
          <option value={suggestion} key={suggestion} />
        ))}
      </datalist>
    </div>
  );
};
