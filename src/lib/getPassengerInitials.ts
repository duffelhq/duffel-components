export const getPassengerInitials = (passengerName: string) =>
  passengerName
    .split(" ")
    .map((partOfTheName) => partOfTheName[0])
    .slice(0, 2)
    .join("");
