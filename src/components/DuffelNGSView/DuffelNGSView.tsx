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
import { NGSSliceFareCard } from "./NGSSliceFareCard";

export interface DuffelNGSViewProps {
  offers: OfferWithNGS[];
  sliceIndex: number;
}

type OfferPosition = {
  row: number;
  shelf: NGSShelf;
};

const getPreviousShelf = (shelf: NGSShelf): NGSShelf | null => {
  switch (shelf) {
    case "1":
      return null;
    case "2":
      return "1";
    case "3":
      return "2";
    case "4":
      return "3";
    case "5":
      return "4";
  }
};

const getNextShelf = (shelf: NGSShelf): NGSShelf | null => {
  switch (shelf) {
    case "1":
      return "2";
    case "2":
      return "3";
    case "3":
      return "4";
    case "4":
      return "5";
    case "5":
      return null;
  }
};

const getPreviousOffer = (
  rows: NGSOfferRow[],
  expandedOffer: OfferPosition,
): OfferWithNGS | null => {
  const previousShelf = getPreviousShelf(expandedOffer.shelf);
  if (!previousShelf) {
    return null;
  }
  const previousOffer = rows[expandedOffer.row][previousShelf];
  if (previousOffer) {
    return previousOffer;
  }
  return getPreviousOffer(rows, {
    row: expandedOffer.row,
    shelf: previousShelf,
  });
};

const getNextOffer = (
  rows: NGSOfferRow[],
  expandedOffer: OfferPosition,
): OfferWithNGS | null => {
  const nextShelf = getNextShelf(expandedOffer.shelf);
  if (!nextShelf) {
    return null;
  }
  const nextOffer = rows[expandedOffer.row][nextShelf];
  if (nextOffer) {
    return nextOffer;
  }
  return getNextOffer(rows, { row: expandedOffer.row, shelf: nextShelf });
};

export const DuffelNGSView: React.FC<DuffelNGSViewProps> = ({
  offers,
  sliceIndex,
}) => {
  const [selectedColumn, setSelectedColumn] = React.useState<NGSShelf | null>(
    null,
  );
  const [sortShelf, setSortShelf] = React.useState<NGSShelf | null>(null);
  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>("asc");
  const [rows, setRows] = React.useState<NGSOfferRow[]>(
    groupOffersForNGSView(offers, sliceIndex),
  );
  const [expandedOffer, setExpandedOffer] =
    React.useState<OfferPosition | null>(null);

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
                  setExpandedOffer(null);
                }}
              >
                <div
                  className={classNames(
                    "duffel-ngs-view_column-header",
                    selectedColumn === shelf &&
                      "duffel-ngs-view_column-header--selected",
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
            <>
              <tr key={index}>
                <td className="duffel-ngs-view_slice-info">
                  <SliceCarriersTitle slice={row["slice"]} />
                  <div>TODO Flight Summary</div>
                </td>
                {NGS_SHELVES.map((shelf) => (
                  <td
                    key={shelf}
                    onClick={() => {
                      if (
                        expandedOffer?.row === index &&
                        expandedOffer?.shelf === shelf
                      ) {
                        setExpandedOffer(null);
                      } else if (selectedColumn === shelf) {
                        setExpandedOffer({ row: index, shelf });
                      }
                    }}
                    className={classNames(
                      "duffel-ngs-view_table-data",
                      selectedColumn === shelf &&
                        "duffel-ngs-view_table-data--selected",
                      expandedOffer?.row === index &&
                        expandedOffer?.shelf === shelf &&
                        "duffel-ngs-view_table-data--expanded",
                    )}
                  >
                    {row[shelf]
                      ? moneyStringFormatter(row[shelf]!.total_currency)(
                          +row[shelf]!.total_amount,
                        )
                      : "-"}
                  </td>
                ))}
              </tr>
              {expandedOffer?.row === index &&
                rows[index][expandedOffer.shelf] && (
                  <tr>
                    <td colSpan={6} className="duffel-ngs-view_expanded">
                      <div>
                        {getPreviousOffer(rows, expandedOffer) && (
                          <NGSSliceFareCard
                            offer={getPreviousOffer(rows, expandedOffer)!}
                            sliceIndex={sliceIndex}
                            compareToAmount={
                              +rows[index][expandedOffer.shelf]!.total_amount
                            }
                            className="duffel-ngs-view_card--alternative"
                          />
                        )}
                        <NGSSliceFareCard
                          offer={rows[index][expandedOffer.shelf]!}
                          sliceIndex={sliceIndex}
                          selected
                          className="duffel-ngs-view_card--selected"
                        />
                        {getNextOffer(rows, expandedOffer) && (
                          <NGSSliceFareCard
                            offer={getNextOffer(rows, expandedOffer)!}
                            sliceIndex={sliceIndex}
                            compareToAmount={
                              +rows[index][expandedOffer.shelf]!.total_amount
                            }
                            className="duffel-ngs-view_card--alternative"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
