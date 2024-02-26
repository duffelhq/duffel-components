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
import {
  SortDirection,
  getCheapestOfferAmount,
  sortNGSRows,
} from "./lib/sort-ngs-rows";
import { NGSSliceFareCard } from "./NGSSliceFareCard";
import { NGSShelfInfoCard } from "./NGSShelfInfoCard";
import { SliceSummary } from "./SliceSummary";
import { OfferSliceModal } from "@components/OfferSliceModal/OfferSliceModal";
import { Offer } from "@duffel/api/types";

export interface NGSTableProps {
  offers: Offer[];
  sliceIndex: number;
  previousSliceKeys: string[]; // For filtering the current set of offers
  onSelect: (offerId: string, sliceKey: string) => void;
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
    null
  );
  const [sortShelf, setSortShelf] = React.useState<NGSShelf | null>(null);
  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>("asc");
  const [expandedOffer, setExpandedOffer] =
    React.useState<OfferPosition | null>(null);
  const [isOfferSliceModalOpen, setIsOfferSliceModalOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    setSelectedColumn(null);
    setSortShelf(null);
    setExpandedOffer(null);
    setIsOfferSliceModalOpen(false);
  }, [previousSliceKeys]);

  const rows = groupOffersForNGSView(offers, sliceIndex, previousSliceKeys);
  const sortedRows = sortShelf
    ? sortNGSRows(rows, sortShelf, sortDirection)
    : rows;

  if (offers.length == 0) {
    return null;
  }

  return (
    <div className="ngs-table">
      <table className="ngs-table_table">
        <thead>
          <tr className="ngs-table_table-header">
            <th className="ngs-table_th"></th>
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
                    "ngs-table_column-header",
                    selectedColumn === shelf &&
                      "ngs-table_column-header--selected"
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
                      +shelf >= 3 && "ngs-table_column-header-tooltip--left"
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
                    onClick={() => setIsOfferSliceModalOpen(true)}
                    className="ngs-table_slice-details-button"
                  >
                    View details
                  </button>
                  <OfferSliceModal
                    slice={row["slice"]}
                    isOpen={isOfferSliceModalOpen}
                    onClose={() => setIsOfferSliceModalOpen(false)}
                  />
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
                        "ngs-table_table-data--expanded"
                    )}
                  >
                    {row[shelf]
                      ? moneyStringFormatter(row[shelf]![0].total_currency)(
                          getCheapestOfferAmount(row[shelf])!
                        )
                      : "-"}
                  </td>
                ))}
              </tr>
              {expandedOffer?.row === index &&
                rows[index][expandedOffer.shelf] && (
                  <tr>
                    <td colSpan={6} className="ngs-table_expanded">
                      <div>
                        {rows[index][expandedOffer.shelf]?.map((offer) => (
                          <NGSSliceFareCard
                            key={offer.id}
                            offer={offer}
                            sliceIndex={sliceIndex}
                            selected
                            className="ngs-table_card--selected"
                            onSelect={() =>
                              onSelect(
                                offer.id,
                                getNGSSliceKey(offer.slices[sliceIndex])
                              )
                            }
                          />
                        ))}
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
