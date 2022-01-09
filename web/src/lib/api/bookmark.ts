import { IBookmarkGetResponse } from "types/bookmark";
import client from "./client";

// 휴지통 북마크 조회
export const getTrashBookmarkAPI = async (
  page: number,
  size: number,
  sort: string,
  remind: boolean
) => {
  const response = await client.get<IBookmarkGetResponse>(
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
  const response = await client.get<IBookmarkGetResponse>(
    `/api/v1/page/search/${keyword}?page=${page}&size=${size}&sort=${sort}&remind=${remind}`
  );
  return response.data;
};

// 모든 도토리 북마크 조회
export const getAllBookmarkAPI = async (
  page: number,
  size: number,
  sort: string,
  remind: boolean
) => {
  const response = await client.get<IBookmarkGetResponse>(
    `/api/v1/page/main?page=${page}&size=${size}&sort=${sort}&remind=${remind}`
  );
  return response.data;
};
