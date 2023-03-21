import * as React from "react";
import { LayoutSelectionPassenger, OfferSliceSegment } from "../types/Offer";

interface State {
  selectedPassengerIdx: number;
  selectedSegmentIdx: number;

  // While technically we might not need to store these two in the state, we need to do it
  // here so that we can handle the situation where the segments / passengers could get updated
  // within the component's lifecycle
  segments: OfferSliceSegment[];
  passengers: LayoutSelectionPassenger[];
}

type Action =
  | { type: "selectPreviousPassenger" }
  | { type: "selectNextPassenger" }
  | { type: "selectPassenger"; passengerId: string; segmentId: string }
  | {
      type: "reset";
      passengers: LayoutSelectionPassenger[];
      segments: OfferSliceSegment[];
    };

const reducer = (state: State, action: Action): State => {
  const { passengers, segments, selectedPassengerIdx, selectedSegmentIdx } =
    state;

  switch (action.type) {
    case "selectPreviousPassenger":
      // if this is not the first passenger, go to previous passenger
      if (selectedPassengerIdx > 0) {
        return {
          ...state,
          selectedPassengerIdx: selectedPassengerIdx - 1,
        };
      }
      // if this is the first passenger and there is a previous segment, go to the previous segment's last passenger
      if (selectedSegmentIdx > 0) {
        return {
          ...state,
          selectedPassengerIdx: passengers.length - 1,
          selectedSegmentIdx: selectedSegmentIdx - 1,
        };
      }
      // otherwise, don't change
      return state;

    case "selectNextPassenger":
      // if this is not the last passenger, go to next passenger
      if (selectedPassengerIdx < passengers.length - 1) {
        return { ...state, selectedPassengerIdx: selectedPassengerIdx + 1 };
      }
      // if this is the last passenger and there is still more segment, go to the next one
      if (selectedSegmentIdx < segments.length - 1) {
        return {
          ...state,
          selectedPassengerIdx: 0,
          selectedSegmentIdx: selectedSegmentIdx + 1,
        };
      }
      // otherwise, don't change
      return state;

    case "selectPassenger":
      return {
        ...state,
        selectedPassengerIdx: Math.max(
          0,
          passengers.findIndex((p) => p.id === action.passengerId)
        ),
        selectedSegmentIdx: Math.max(
          0,
          segments.findIndex((s) => s.id === action.segmentId)
        ),
      };
    case "reset":
      return {
        passengers: passengers,
        segments: segments,
        selectedPassengerIdx: 0,
        selectedSegmentIdx: 0,
      };
  }
};

interface PassengerContextValues {
  passengers: LayoutSelectionPassenger[];
  segments: OfferSliceSegment[];
  selectedPassenger: LayoutSelectionPassenger;
  selectedSegment: OfferSliceSegment;
  hasPreviousPassenger: boolean;
  hasNextPassenger: boolean;
  isLastPassengerInSegment: boolean;
  dispatch: React.Dispatch<Action>;
}

const PassengersContext = React.createContext<
  PassengerContextValues | undefined
>(undefined);

export interface PassengersProviderProps {
  passengers: LayoutSelectionPassenger[];
  segments: OfferSliceSegment[];
}

export const PassengersProvider: React.FC<
  React.PropsWithChildren<PassengersProviderProps>
> = ({ passengers, segments, children }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    passengers,
    segments,
    selectedPassengerIdx: 0,
    selectedSegmentIdx: 0,
  });

  // If these props were to change, reset the selections to be safe from possible
  // out-of-bound issues
  React.useEffect(() => {
    dispatch({ type: "reset", passengers, segments });
  }, [passengers, segments]);

  return (
    <PassengersContext.Provider
      value={{
        passengers,
        segments,
        selectedPassenger: state.passengers[state.selectedPassengerIdx],
        selectedSegment: state.segments[state.selectedSegmentIdx],
        hasPreviousPassenger:
          state.selectedPassengerIdx === 0 && state.selectedSegmentIdx === 0,
        hasNextPassenger:
          state.selectedPassengerIdx < passengers.length - 1 ||
          state.selectedSegmentIdx < segments.length - 1,
        isLastPassengerInSegment:
          state.selectedPassengerIdx === passengers.length - 1,
        dispatch,
      }}
    >
      {children}
    </PassengersContext.Provider>
  );
};

export const usePassengersContext = () => React.useContext(PassengersContext);
