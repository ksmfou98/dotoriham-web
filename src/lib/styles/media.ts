export const mediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

export const breakpoints = {
  desktop: 1065,
};

const { desktop } = breakpoints;

const media = {
  desktop: mediaQuery(desktop),
};

export default media;
