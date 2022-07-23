import { FilterMenu, IDotoriItem } from "types/dotori";

export const DOTORI_FILTER_TYPES = {
  LATEST_ORDER: "saveTime,desc" as const,
  OLDEST_ORDER: "saveTime,asc" as const,
  FREQUENTLY_VISITED: "clickCount,desc" as const,
  LESS_VISITED: "clickCount,asc" as const,
};

export const DOTORI_FILTER_MENUS: FilterMenu[] = [
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

export const DOTORI_PAGE_SIZE = {
  main: 8,
  folder: 8,
  trash: 12,
  search: 12,
};

export const initialDotoriState: IDotoriItem = {
  id: "",
  title: "",
  checked: false,
  saveTime: "",
  clickCount: 0,
  folderId: "",
  folderName: "",
  deleteTime: "",
  deleted: false,
  description: "",
  folderEmoji: "",
  image: "",
  link: "",
  remindTime: "",
  userId: 0,
  nickname: "",
};
