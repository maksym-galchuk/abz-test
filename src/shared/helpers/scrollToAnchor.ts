export const scrollToAnchor = (anchor: string) => {
  location.hash = "";
  location.hash = `#${anchor}`;
};
