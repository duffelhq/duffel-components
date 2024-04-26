import * as React from "react";
import { NGSShelf, NGS_SHELF_INFO, NGS_SHELVES } from "./lib";
import { Icon } from "@components/shared/Icon";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import classNames from "classnames";
import { SliceCarriersTitle } from "@components/shared/SliceCarriersTitle";
import {
  getNGSSliceKey,
  groupOffersForNGSView,
} from "./lib/group-offers-for-ngs-view";

import { NGSSliceFareCard } from "./NGSSliceFareCard";
import { NGSShelfInfoCard } from "./NGSShelfInfoCard";
import { SliceSummary } from "./SliceSummary";
import { OfferSliceModal } from "@components/OfferSliceModal/OfferSliceModal";
import { OfferRequest, OfferSlice } from "@duffel/api/types";
import {
  getCheapestOffer,
  getFareBrandNameForOffer,
} from "./lib/deduplicate-mapped-offers-by-fare-brand";
import {
  SortDirection,
  getCheapestOfferAmount,
  sortNGSRowsByShelfPrice,
} from "./lib/sort-ngs-rows-by-shelf-price";
import {
  DurationSort,
  sortNGSRowsByDuration,
} from "./lib/sort-ngs-rows-by-duration";

export interface NGSTableProps {
  offers: OfferRequest["offers"];
  sliceIndex: number;
  previousSliceKeys: string[]; // For filtering the current set of offers
  onSelect: (
    offerId: string,
    sliceKey: string,
    offer: OfferRequest["offers"][number],
  ) => void;
}

type OfferPosition = {
  row: number;
  shelf: NGSShelf;
};

export const NGSTable: React.FC<NGSTableProps> = ({
  offers,
  sliceIndex,
  onSelect,
  previousSliceKeys,
}) => {
  const [selectedColumn, setSelectedColumn] = React.useState<NGSShelf | null>(
    null,
  );
  const [sortShelf, setSortShelf] = React.useState<NGSShelf | null>(null);
  const [sortDuration, setSortDuration] = React.useState<DurationSort>(null);

  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>("asc");
  const [expandedOffer, setExpandedOffer] =
    React.useState<OfferPosition | null>(null);
  const [isOfferSliceModalOpen, setIsOfferSliceModalOpen] =
    React.useState<boolean>(false);
  const [offerSliceModalSlice, setOfferSliceModalSlice] =
    React.useState<OfferSlice>(offers[0].slices[sliceIndex]);

  React.useEffect(() => {
    setSelectedColumn(null);
    setSortShelf(null);
    setExpandedOffer(null);
    setIsOfferSliceModalOpen(false);
  }, [previousSliceKeys]);

  const rows = groupOffersForNGSView(offers, sliceIndex, previousSliceKeys);
  let sortedRows = rows;
  if (sortDuration != null) {
    sortedRows = sortNGSRowsByDuration(rows, sortDuration);
  }

  if (sortShelf != null) {
    sortNGSRowsByShelfPrice(rows, sortShelf, sortDirection);
  }

  if (offers.length == 0) {
    return null;
  }

  let tripType = "";
  if (offers[0].slices.length == 1) tripType = "One-way";
  if (
    offers[0].slices.length == 2 &&
    offers[0].slices[0].origin.iata_code ===
      offers[0].slices[1].destination.iata_code
  )
    tripType = "Roundtrip";

  return (
    <div className="ngs-table">
      <table className="ngs-table_table">
        <thead>
          <tr className="ngs-table_table-header">
            <th
              className="ngs-table_th ngs-table_th--sticky"
              onClick={() => {
                setSortShelf(null);

                if (sortDuration === null) {
                  setSortDuration("asc");
                } else if (sortDuration === "asc") {
                  setSortDuration("desc");
                } else {
                  setSortDuration("asc");
                }
              }}
            >
              <div
                className={classNames(
                  "ngs-table_column-header",
                  sortDuration != null && "ngs-table_column-header--selected",
                )}
              >
                <span>Duration sort</span>
                {sortDuration != null && (
                  <Icon
                    name={
                      sortDuration === "asc" ? "arrow_downward" : "arrow_upward"
                    }
                    size={12}
                    color="--GREY-900"
                    className="ngs-table_sort-icon"
                  />
                )}
              </div>
            </th>
            {NGS_SHELVES.map((shelf) => (
              <th
                key={shelf}
                onClick={() => {
                  setSortDuration(null);
                  if (shelf === sortShelf) {
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  } else if (selectedColumn === shelf) {
                    setSortShelf(shelf);
                  }
                  setSelectedColumn(shelf);
                  setExpandedOffer(null);
                }}
                className="ngs-table_th--sticky"
              >
                <div
                  className={classNames(
                    "ngs-table_column-header",
                    selectedColumn === shelf &&
                      "ngs-table_column-header--selected",
                  )}
                >
                  <Icon
                    name={NGS_SHELF_INFO[shelf].icon}
                    size={14}
                    color={
                      selectedColumn === shelf ? "--GREY-900" : "--GREY-500"
                    }
                    className="ngs-table_shelf-icon"
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
                      className="ngs-table_sort-icon"
                    />
                  ) : selectedColumn === shelf ? (
                    <Icon
                      name="unfold_more"
                      size={12}
                      color="--GREY-900"
                      className="ngs-table_sort-icon"
                    />
                  ) : null}
                  <NGSShelfInfoCard
                    ngs_shelf={shelf}
                    className={classNames(
                      "ngs-table_column-header-tooltip",
                      +shelf >= 3 && "ngs-table_column-header-tooltip--left",
                    )}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) => (
            <>
              <tr key={index}>
                <td className="ngs-table_slice-info">
                  <SliceCarriersTitle slice={row["slice"]} />
                  <SliceSummary slice={row["slice"]} />
                  <button
                    onClick={() => {
                      setOfferSliceModalSlice(row["slice"]);
                      setIsOfferSliceModalOpen(true);
                    }}
                    className="ngs-table_slice-details-button"
                  >
                    View details
                  </button>
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
                      } else {
                        setSelectedColumn(shelf);
                        setExpandedOffer({ row: index, shelf });
                      }
                    }}
                    className={classNames(
                      "ngs-table_table-data",
                      selectedColumn === shelf &&
                        "ngs-table_table-data--selected",
                      expandedOffer?.row === index &&
                        expandedOffer?.shelf === shelf &&
                        "ngs-table_table-data--expanded",
                    )}
                  >
                    {row[shelf] ? (
                      <div>
                        <p className="ngs-table_table-data--details">
                          {getFareBrandNameForOffer(
                            getCheapestOffer(row[shelf]!),
                          )}
                        </p>
                        <p>
                          {moneyStringFormatter(row[shelf]![0].total_currency)(
                            getCheapestOfferAmount(row[shelf])!,
                          )}
                        </p>
                        <p className="ngs-table_table-data--details">
                          {tripType}
                        </p>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                ))}
              </tr>
              {expandedOffer?.row === index &&
                sortedRows[index][expandedOffer.shelf] && (
                  <tr>
                    <td colSpan={6} className="ngs-table_expanded">
                      <div>
                        {sortedRows[index][expandedOffer.shelf]?.map(
                          (offer) => (
                            <NGSSliceFareCard
                              key={offer.id}
                              offer={offer}
                              sliceIndex={sliceIndex}
                              onSelect={() =>
                                onSelect(
                                  offer.id,
                                  getNGSSliceKey(
                                    offer.slices[sliceIndex],
                                    offer.owner.iata_code,
                                    true,
                                  ),
                                  offer,
                                )
                              }
                            />
                          ),
                        )}
                      </div>
                    </td>
                  </tr>
                )}
            </>
          ))}
        </tbody>
      </table>
      <OfferSliceModal
        slice={offerSliceModalSlice}
        isOpen={isOfferSliceModalOpen}
        onClose={() => setIsOfferSliceModalOpen(false)}
      />
    </div>
  );
};
