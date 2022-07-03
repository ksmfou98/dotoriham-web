export const mediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

export const breakpoints = {
  desktop: 1065,
  share: 900,
};

const { desktop } = breakpoints;

export const media = {
  desktop: mediaQuery(desktop),
};
