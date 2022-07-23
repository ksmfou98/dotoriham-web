export const DOTORI_SORT_TYPES = {
  LATEST_ORDER: "saveTime,desc",
  OLDEST_ORDER: "saveTime,asc",
  FREQUENTLY_VISITED: "clickCount,desc",
  LESS_VISITED: "clickCount,asc",
} as const;

export const DOTORI_SORT_MENUS = [
  {
    text: "최신순",
    label: DOTORI_SORT_TYPES.LATEST_ORDER,
  },
  {
    text: "오래된 순",
    label: DOTORI_SORT_TYPES.OLDEST_ORDER,
  },
  {
    text: "자주 방문한 순",
    label: DOTORI_SORT_TYPES.FREQUENTLY_VISITED,
  },
  {
    text: "적게 방문한 순",
    label: DOTORI_SORT_TYPES.LESS_VISITED,
  },
];
