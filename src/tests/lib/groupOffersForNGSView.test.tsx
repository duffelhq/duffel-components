import {
  getNGSSliceKey,
  groupOffersForNGSView,
} from "@components/DuffelNGSView/lib/group-offers-for-ngs-view";
import { duplicateOffers } from "../../stories/DuffelNGSView.stories";

describe("groupOffersForNGSView", () => {
  test("should group duplicate offers within fare brands for NGS view correctly", () => {
    const firstSliceResult = groupOffersForNGSView(duplicateOffers, 0, []);
    console.log(firstSliceResult);

    expect(firstSliceResult).toHaveLength(2);
    expect(firstSliceResult[0]["1"]).toHaveLength(2);
    expect(firstSliceResult[1]["1"]).toHaveLength(2);
    expect(firstSliceResult[0]["1"]![0].total_amount).toBe("10");
    expect(firstSliceResult[0]["1"]![1].total_amount).toBe("20");
    expect(firstSliceResult[1]["1"]![0].total_amount).toBe("50");
    expect(firstSliceResult[1]["1"]![1].total_amount).toBe("60");

    const prevSliceKey = getNGSSliceKey(
      duplicateOffers[0].slices[0],
      duplicateOffers[0].owner.iata_code,
      true,
    );
    const secondSliceResult = groupOffersForNGSView(duplicateOffers, 1, [
      prevSliceKey,
    ]);

    expect(secondSliceResult).toHaveLength(3);
    expect(secondSliceResult[0]["1"]).toHaveLength(1);
    expect(secondSliceResult[1]["1"]).toHaveLength(1);
    expect(secondSliceResult[2]["1"]).toHaveLength(1);
    expect(secondSliceResult[0]["1"]![0].total_amount).toBe("10");
    expect(secondSliceResult[1]["1"]![0].total_amount).toBe("30");
    expect(secondSliceResult[2]["1"]![0].total_amount).toBe("90");
  });
});
