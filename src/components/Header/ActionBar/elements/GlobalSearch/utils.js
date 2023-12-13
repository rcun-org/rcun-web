export const getPlaceholderByPathname = (pathname) => {
  const basePlaceholder = "Search";

  switch (pathname) {
    case "/library": {
      return basePlaceholder + " movie";
    }
    default: {
      return basePlaceholder + " room";
    }
  }
};
