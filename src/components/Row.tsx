import classNames from "classnames";
import * as React from "react";
import { Amenity } from "./Amenity";
import { Seat } from "./Seat";
import {
  SeatMapCabinRow,
  SeatMapCabinRowSectionElement,
} from "src/types/SeatMap";
import { Icon } from "./Icon";
import { getRowNumber } from "@lib/get-row-number";
export interface RowProps {
  /**
   * The row contents.
   */
  row: SeatMapCabinRow;
  /**
   * Does the row sit above wings?
   */
  hasWings: boolean;
}

const elementComponentMap = (
  element: SeatMapCabinRowSectionElement,
  elementIndex: number,
  sectionIndex: number
) => (
  <>
    {element.type === "seat" ? (
      <Seat key={elementIndex} seat={element} />
    ) : element.type === "empty" ? (
      <div key={elementIndex} className="map-element map-element--empty" />
    ) : element.type === "exit_row" ? (
      <div
        key={elementIndex}
        className={classNames("map-element map-element--exit", {
          "map-element--exit--right": sectionIndex > 0,
        })}
      >
        {sectionIndex === 0 ? (
          <Icon name="exit_row" />
        ) : (
          <Icon name="exit_row_right" />
        )}
      </div>
    ) : (
      <Amenity key={elementIndex} type={element.type} />
    )}
  </>
);

/**
 * The row component for the seat map.
 */
export const Row: React.FC<RowProps> = ({ row, hasWings }) => {
  const rowNumber = getRowNumber(row);
  const rowSections = row.sections;

  return (
    <>
      {Object.values(rowSections).map((section, sectionIndex) => {
        const rowLength = Object.keys(row.sections).length;
        const isOneSectionRow = rowLength === 1;

        return (
          <React.Fragment key={sectionIndex}>
            <div
              className={classNames("map-section", {
                "map-section--left": sectionIndex === 0,
                "map-section--right": !isOneSectionRow
                  ? sectionIndex === rowLength - 1
                  : false,
                "map-section--wing": hasWings,
              })}
              data-testid={`row-section-${sectionIndex}`}
            >
              {section.elements.length > 0
                ? section.elements.map((element, elementIndex) => (
                    <React.Fragment key={elementIndex}>
                      {elementComponentMap(element, elementIndex, sectionIndex)}
                    </React.Fragment>
                  ))
                : elementComponentMap({ type: "empty" }, -1, sectionIndex)}
            </div>
            {(sectionIndex < rowLength - 1 ||
              (isOneSectionRow && sectionIndex < rowLength)) && (
              <span className="map-section__aisle">{rowNumber}</span>
            )}
            {isOneSectionRow &&
              sectionIndex === row.sections.length - 1 &&
              elementComponentMap({ type: "empty" }, -1, sectionIndex)}
          </React.Fragment>
        );
      })}
    </>
  );
};
