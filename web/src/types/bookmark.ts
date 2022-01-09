import { ItemId } from "@atlaskit/tree";

export interface IBookmark {
  clickCount: number;
  deleteTime: string;
  deleted: boolean;
  description: null | string;
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

export interface IBookmarkItem extends IBookmark {
  checked: boolean;
}

export type BookmarkSortType = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type BookmarkPageableType = {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: BookmarkSortType;
  unpaged: boolean;
};

export interface IBookmarkListResponse {
  content: IBookmark[];
  empty: boolean;
  first: true;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: BookmarkPageableType;
  size: number;
  sort: BookmarkSortType;
  totalElements: number;
  totalPages: number;
}
