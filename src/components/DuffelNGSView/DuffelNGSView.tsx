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

export interface DuffelNGSViewProps {
  offers: OfferWithNGS[];
  sliceIndex: number;
}

type SortSettings = {
  shelf: NGSShelf | null;
  direction: "asc" | "desc";
};

export const DuffelNGSView: React.FC<DuffelNGSViewProps> = ({
  offers,
  sliceIndex,
}) => {
  const [selectedColumn, setSelectedColumn] = React.useState<NGSShelf | null>(
    null
  );
  const [sortSettings, setSortSettings] = React.useState<SortSettings>({
    shelf: null,
    direction: "asc",
  });
  const [rows, setRows] = React.useState<NGSOfferRow[]>(
    groupOffersForNGSView(offers, sliceIndex)
  );

  React.useEffect(() => {
    if (sortSettings.shelf) {
      const sortedRows = [...rows].sort((a, b) => {
        const aAmount = +(a[sortSettings.shelf!]?.total_amount || 0);
        const bAmount = +(b[sortSettings.shelf!]?.total_amount || 0);
        if (aAmount && bAmount) {
          return sortSettings.direction === "asc"
            ? aAmount - bAmount
            : bAmount - aAmount;
        }
        return 0;
      });
      setRows(sortedRows);
    }
  }, [sortSettings]);

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
                  if (shelf === sortSettings.shelf) {
                    setSortSettings({
                      shelf,
                      direction:
                        sortSettings.direction === "asc" ? "desc" : "asc",
                    });
                  } else if (selectedColumn === shelf) {
                    setSortSettings({
                      shelf,
                      direction: sortSettings.direction,
                    });
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
                  {sortSettings.shelf === shelf ? (
                    <Icon
                      name={
                        sortSettings.direction === "asc"
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
