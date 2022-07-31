import { breakpoints } from "lib/styles";

export const isMobile = () => {
  return window.innerWidth < breakpoints.medium;
};
