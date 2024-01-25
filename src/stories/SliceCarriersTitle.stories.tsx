import { SliceCarriersTitle } from "@components/shared/SliceCarriersTitle";
import { Meta, StoryObj } from "@storybook/react";

export default {
  title: "SliceCarriersTitle",
  component: SliceCarriersTitle,
  decorators: [
    (Story) => (
      <div className="duffel-components">
        <Story />
      </div>
    ),
  ],
} as Meta;

type SliceCarriersTitleStory = StoryObj<typeof SliceCarriersTitle>;

export const OneSegmentWithSameOperatingCarrier: SliceCarriersTitleStory = {
  args: {
    slice: {
      segments: [
        {
          marketing_carrier: {
            id: "AF",
            iata_code: "AF",
            name: "Air France",
          },
          operating_carrier: {
            id: "AF",
            iata_code: "AF",
            name: "Air France",
          },
        },
      ],
    } as any,
  },
};

export const OneSegmentWithDifferentOperatingCarrier: SliceCarriersTitleStory =
  {
    args: {
      slice: {
        segments: [
          {
            marketing_carrier: {
              id: "AF",
              iata_code: "AF",
              name: "Air France",
            },
            operating_carrier: {
              id: "BA",
              iata_code: "BA",
              name: "British Airways",
            },
          },
        ],
      } as any,
    },
  };

export const TwoSegmentsWithTwoDifferentoperatingCarrier: SliceCarriersTitleStory =
  {
    args: {
      slice: {
        segments: [
          {
            marketing_carrier: {
              id: "AF",
              iata_code: "AF",
              name: "Air France",
            },
            operating_carrier: {
              id: "BA",
              iata_code: "BA",
              name: "British Airways",
            },
          },
          {
            marketing_carrier: {
              id: "AF",
              iata_code: "AF",
              name: "Air France",
            },

            operating_carrier: {
              id: "LA",
              iata_code: "LAT",
              name: "LATAM",
            },
          },
        ],
      } as any,
    },
  };

export const TwoSegmentsWithTwoDifferentMarketingAndoperatingCarrier: SliceCarriersTitleStory =
  {
    args: {
      slice: {
        segments: [
          {
            marketing_carrier: {
              id: "AF",
              iata_code: "AF",
              name: "Air France",
            },
            operating_carrier: {
              id: "LA",
              iata_code: "LAT",
              name: "LATAM",
            },
          },
          {
            marketing_carrier: {
              id: "BA",
              iata_code: "BA",
              name: "British Airways",
            },
            operating_carrier: {
              id: "BA",
              iata_code: "BA",
              name: "British Airways",
            },
          },
        ],
      } as any,
    },
  };

export const ALongOne: SliceCarriersTitleStory = {
  args: {
    slice: {
      segments: [
        {
          marketing_carrier: {
            id: "AF",
            iata_code: "AF",
            name: "Air France",
          },
          operating_carrier: {
            id: "LA",
            iata_code: "LAT",
            name: "LATAM",
          },
        },
        {
          marketing_carrier: {
            id: "BA",
            iata_code: "BA",
            name: "British Airways",
          },
          operating_carrier: {
            id: "BA",
            iata_code: "BA",
            name: "British Airways",
          },
        },
        {
          marketing_carrier: {
            id: "BA",
            iata_code: "BA",
            name: "British Airways",
          },
          operating_carrier: {
            id: "BA",
            iata_code: "BA",
            name: "British Airways",
          },
        },
      ],
    } as any,
  },
};
