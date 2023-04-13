export const getNextItemInArray = (items: string[], currentItem: string) => {
  const currentIndex = items.indexOf(currentItem);
  const nextIndex = (currentIndex + 1) % items.length;
  return nextIndex;
};
