export const setBodyScrollability = (shouldScroll: boolean) => {
  if (shouldScroll) {
    document.body.style.overflow = "";
  } else {
    document.body.style.overflow = "hidden";
  }
};
