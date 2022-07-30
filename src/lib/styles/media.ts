export const mediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

export const breakpoints = {
  large: 1065,
  medium: 768,
  share: 900,
};

const { large, medium } = breakpoints;

export const media = {
  large: mediaQuery(large),
  medium: mediaQuery(medium),
};
