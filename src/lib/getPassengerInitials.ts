export const getPassengerInitials = (passengerName = "") =>
  passengerName
    .split(" ")
    .map((partOfTheName) => partOfTheName[0])
    .slice(0, 2)
    .join("");
