import * as React from "react";
import {
  NGSShelf,
  NGS_SHELF_INFO,
  NGS_SHELVES,
  OfferWithNGS,
  OfferSliceWithNGS,
} from "./lib";
import { Icon } from "@components/shared/Icon";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import classNames from "classnames";

export interface DuffelNGSViewProps {
  offers: OfferWithNGS[];
  sliceIndex: number;
}

type NGSOfferRow = Record<"slice", OfferSliceWithNGS> &
  Record<NGSShelf, OfferWithNGS | null>;

export const DuffelNGSView: React.FC<DuffelNGSViewProps> = ({
  offers,
  sliceIndex,
}) => {
  const [selectedColumn, setSelectedColumn] = React.useState<NGSShelf | null>(
    null
  );

  if (offers.length == 0) {
    return null;
  }

  // TODO Group offers by carrier, find offers per carrier for each shelf
  const rows: NGSOfferRow[] = [
    {
      slice: offers[0].slices[sliceIndex],
      "1": null,
      "2": null,
      "3": offers[0],
      "4": null,
      "5": null,
    },
    {
      slice: offers[0].slices[sliceIndex],
      "1": null,
      "2": offers[0],
      "3": offers[0],
      "4": offers[0],
      "5": offers[0],
    },
  ];

  return (
    <div className="duffel-ngs-view duffel-components">
      <table className="duffel-ngs-view_table">
        <thead>
          <tr className="duffel-ngs-view_table-header?">
            <th className="duffel-ngs-view_th"></th>
            {NGS_SHELVES.map((shelf) => (
              <th key={shelf} onClick={() => setSelectedColumn(shelf)}>
                <div
                  className={classNames(
                    "duffel-ngs-view_column-header",
                    selectedColumn === shelf &&
                      "duffel-ngs-view_column-header--selected"
                  )}
                >
                  <Icon
                    name={NGS_SHELF_INFO[shelf].icon}
                    size={16}
                    color={
                      selectedColumn === shelf ? "--GREY-900" : "--GREY-500"
                    }
                    className="duffel-ngs-view_shelf-icon"
                  />
                  {NGS_SHELF_INFO[shelf].short_title}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                {row["slice"].id} TODO Carriers, Flight Summary, View Details
              </td>
              {NGS_SHELVES.map((shelf) => (
                <td
                  key={shelf}
                  onClick={() => setSelectedColumn(shelf)}
                  className={classNames("duffel-ngs-view_table-data", {
                    "duffel-ngs-view_table-data--selected":
                      selectedColumn === shelf,
                  })}
                >
                  {row[shelf]
                    ? moneyStringFormatter(row[shelf]!.total_currency)(
                        +row[shelf]!.total_amount
                      )
                    : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
