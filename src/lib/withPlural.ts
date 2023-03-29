export const withPlural = (
  totalQuantity: number,
  singular: string,
  plural: string
) => {
  if (totalQuantity == 1) return `${totalQuantity} ${singular}`;
  else return `${totalQuantity} ${plural}`;
};
