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
