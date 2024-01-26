import * as React from "react";
import { NGSShelf, NGS_SHELF_INFO, NGS_SHELVES, OfferWithNGS } from "./lib";
import { Icon } from "@components/shared/Icon";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import classNames from "classnames";
import { SliceCarriersTitle } from "@components/shared/SliceCarriersTitle";
import {
  NGSOfferRow,
  groupOffersForNGSView,
} from "./lib/group-offers-for-ngs-view";
import { SortDirection, sortNGSRows } from "./lib/sort-ngs-rows";

export interface DuffelNGSViewProps {
  offers: OfferWithNGS[];
  sliceIndex: number;
}

export const DuffelNGSView: React.FC<DuffelNGSViewProps> = ({
  offers,
  sliceIndex,
}) => {
  const [selectedColumn, setSelectedColumn] = React.useState<NGSShelf | null>(
    null
  );
  const [sortShelf, setSortShelf] = React.useState<NGSShelf | null>(null);
  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>("asc");
  const [rows, setRows] = React.useState<NGSOfferRow[]>(
    groupOffersForNGSView(offers, sliceIndex)
  );

  React.useEffect(() => {
    if (sortShelf) {
      const sortedRows = sortNGSRows(rows, sortShelf, sortDirection);
      setRows(sortedRows);
    }
  }, [sortShelf, sortDirection]);

  if (offers.length == 0) {
    return null;
  }

  return (
    <div className="duffel-ngs-view duffel-components">
      <table className="duffel-ngs-view_table">
        <thead>
          <tr className="duffel-ngs-view_table-header?">
            <th className="duffel-ngs-view_th"></th>
            {NGS_SHELVES.map((shelf) => (
              <th
                key={shelf}
                onClick={() => {
                  if (shelf === sortShelf) {
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  } else if (selectedColumn === shelf) {
                    setSortShelf(shelf);
                  }
                  setSelectedColumn(shelf);
                }}
              >
                <div
                  className={classNames(
                    "duffel-ngs-view_column-header",
                    selectedColumn === shelf &&
                      "duffel-ngs-view_column-header--selected"
                  )}
                >
                  <Icon
                    name={NGS_SHELF_INFO[shelf].icon}
                    size={14}
                    color={
                      selectedColumn === shelf ? "--GREY-900" : "--GREY-500"
                    }
                    className="duffel-ngs-view_shelf-icon"
                  />
                  {NGS_SHELF_INFO[shelf].short_title}
                  {sortShelf === shelf ? (
                    <Icon
                      name={
                        sortDirection === "asc"
                          ? "arrow_downward"
                          : "arrow_upward"
                      }
                      size={12}
                      color={
                        selectedColumn === shelf ? "--GREY-900" : "--GREY-500"
                      }
                      className="duffel-ngs-view_sort-icon"
                    />
                  ) : selectedColumn === shelf ? (
                    <Icon
                      name="unfold_more"
                      size={12}
                      color="--GREY-900"
                      className="duffel-ngs-view_sort-icon"
                    />
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="duffel-ngs-view_slice-info">
                <SliceCarriersTitle slice={row["slice"]} />
                <div>TODO Flight Summary</div>
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
