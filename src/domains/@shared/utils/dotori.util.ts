import { DOTORI_SORT_MENUS } from "../constants";
import { DotoriSortType } from "../models";

export const getSortText = (sort: DotoriSortType) => {
  return DOTORI_SORT_MENUS.find((menu) => menu.label === sort)?.text!;
};
