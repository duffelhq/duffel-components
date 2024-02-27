import { IconName } from "@components/shared/Icon";
import { StaysRoomRate } from "@duffel/api/types";

export const LOYALTY_PROGRAMS_NAME_MAP = {
  wyndham_rewards: "Wyndham Rewards",
  choice_privileges: "Choice Privileges",
  marriott_bonvoy: "Marriott Bonvoy",
  best_western_rewards: "Best Western Rewards",
  world_of_hyatt: "World of Hyatt",
  hilton_honors: "Hilton Honors",
  ihg_one_rewards: "IHG One Rewards",
  leaders_club: "Leaders Club",
  stash_rewards: "Stash Rewards",
  omni_select_guest: "Omni Select Guest",
  i_prefer: "I Prefer",
  accor_live_limitless: "Accor Live Limitless",
  my_6: "My 6",
  jumeirah_one: "Jumeirah One",
  global_hotel_alliance_discovery: "Global Hotel Alliance Discovery",
  duffel_hotel_group_rewards: "Duffel Hotel Group Rewards",
};

export const SOURCE_NAME_MAP = {
  bookingcom: "Booking.com",
  expedia: "Expedia",
  priceline: "Priceline",
  travelport: "Travelport",
  duffel_hotel_group: "Duffel Hotel Group"
}

export const getBoardTypeLabel = (boardType: StaysRoomRate["board_type"]) => {
  switch (boardType) {
    case "room_only":
      return "Room only, no meals";
    case "breakfast":
      return "Breakfast included";
    case "half_board":
      return "Half board";
    case "full_board":
      return "Full board";
    case "all_inclusive":
      return "All inclusive";
    default:
      return boardType;
  }
};

export const boardTypeIcon = (
  boardType: StaysRoomRate["board_type"],
): IconName => {
  switch (boardType) {
    case "room_only":
      return "bedroom_parent";
    case "breakfast":
      return "bakery_dining";
    case "half_board":
      return "bakery_dining";
    case "full_board":
      return "brunch_dining";
    case "all_inclusive":
      return "brunch_dining";
    default:
      return boardType;
  }
};
