import classNames from "classnames";

export interface TabsProps<T_Options extends string> {
  /**
   * The currently selected tab option
   */
  value: T_Options;

  /**
   * Callback for when a new tab option is selected
   */
  onChange: (value: T_Options) => void;

  /**
   * The options you want to render on the tabs
   */
  options: T_Options[];
}

export function Tabs<T extends string>({
  value,
  onChange,
  options,
}: TabsProps<T>) {
  return (
    <div className="seat-map__tab-select">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={classNames("seat-map__tab-select-option", {
            "seat-map__tab-select-option--selected": option === value,
          })}
          onClick={() => value !== option && onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
