export const mediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

export const mediaSize = {
  desktop: 1065,
};

const { desktop } = mediaSize;

const media = {
  desktop: mediaQuery(desktop),
};

export default media;
