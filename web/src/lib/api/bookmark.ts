import { ItemId } from "@atlaskit/tree";
import { IBookmarkListResponse } from "types/bookmark";
import client from "./client";

// 휴지통 북마크 조회
export const getTrashBookmarkAPI = async (
  page: number,
  size: number,
  sort: string,
  remind: boolean
) => {
  const response = await client.get<IBookmarkListResponse>(
    `/api/v1/page/trash?page=${page}&size=${size}&sort=${sort}&remind=${remind}`
  );
  return response.data;
};

// 검색 결과 북마크 조회
export const getSearchBookmarkAPI = async (
  keyword: string,
  page: number,
  size: number,
  sort: string,
  remind: boolean
) => {
  const response = await client.get<IBookmarkListResponse>(
    `/api/v1/page/search/${keyword}?page=${page}&size=${size}&sort=${sort}&remind=${remind}`
  );
  return response.data;
};

// 북마크 조회  folderId가 main 이면 모든 북마크 조회
export const getBookmarkAPI = async (
  folderId: ItemId,
  page: number,
  size: number,
  sort: string,
  remind: boolean
) => {
  const response = await client.get<IBookmarkListResponse>(
    `/api/v1/page/${folderId}?page=${page}&size=${size}&sort=${sort}&remind=${remind}`
  );
  return response.data;
};
