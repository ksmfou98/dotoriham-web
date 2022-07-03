import { ItemId } from "@atlaskit/tree";

export interface Dotori {
  clickCount: number;
  deleteTime: string;
  deleted: boolean;
  description: string;
  nickname?: string;
  folder?: string;
  folderId: ItemId;
  id: string;
  link: string;
  remindTime: null | string;
  saveTime: string;
  title: string;
  userId: number;
  image: string;
  folderName: string;
  folderEmoji: string;
}

export interface IDotoriItem extends Dotori {
  checked: boolean;
}

export type DotoriPageableType = {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  unpaged: boolean;
};

export interface IDotoriListResponse {
  content: Dotori[];
  empty: boolean;
  first: true;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: DotoriPageableType;
  size: number;
  sort: DotoriSortType;
  totalElements: number;
  totalPages: number;
}

export type DotoriSortType =
  | "saveTime,desc"
  | "saveTime,asc"
  | "clickCount,desc"
  | "clickCount,asc";

export interface DotoriUpdateRequest {
  dotoriId: string;
  title: string;
  description: string;
}

export interface DotoriMoveRequest {
  bookmarkIdList: string[];
  nextFolderId: ItemId;
}

export interface DotoriForm {
  id: string;
  link: string;
  title: string;
  remind: boolean;
  image: string;
  description: string;
}

export type DotoriFormRequestType = Omit<DotoriForm, "id">;

export interface DotoriAddRequest {
  folderId: ItemId;
  addBookmarkList: DotoriFormRequestType[];
}

export interface DotoriRemindToggleRequest {
  remind: boolean;
  dotoriId: string;
}

export type FilterMenuTextType =
  | "최신순"
  | "오래된 순"
  | "자주 방문한 순"
  | "적게 방문한 순";

export interface FilterMenu {
  text: FilterMenuTextType;
  label: DotoriSortType;
}

export type DotoriPathTypes = "main" | "trash" | "search" | "folder";
