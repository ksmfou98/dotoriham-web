import { DOTORI_FILTER_TYPES } from "lib/constants";

const dotoriFilterMenus = [
  {
    text: "최신순",
    label: DOTORI_FILTER_TYPES.LATEST_ORDER,
  },
  {
    text: "오래된 순",
    label: DOTORI_FILTER_TYPES.OLDEST_ORDER,
  },
  {
    text: "자주 방문한 순",
    label: DOTORI_FILTER_TYPES.FREQUENTLY_VISITED,
  },
  {
    text: "적게 방문한 순",
    label: DOTORI_FILTER_TYPES.LESS_VISITED,
  },
];

export default dotoriFilterMenus;
