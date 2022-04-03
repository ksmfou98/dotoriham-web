import { ItemId } from "@atlaskit/tree";
import {
  DotoriSortType,
  DotoriUpdateRequest,
  IDotoriListResponse,
} from "types/dotori";
import client from "./client";

// 휴지통 북마크 조회
export const getTrashDotorisAPI = async (
  page: number,
  size: number,
  sort: DotoriSortType,
  remind: boolean
) => {
  const response = await client.get<IDotoriListResponse>(
    `/api/v1/page/trash?page=${page}&size=${size}&sort=${sort}&remind=${remind}`
  );
  return response.data;
};

// 검색 결과 북마크 조회
export const getSearchDotorisAPI = async (
  keyword: string,
  page: number,
  size: number,
  sort: DotoriSortType,
  remind: boolean
) => {
  const response = await client.get<IDotoriListResponse>(
    `/api/v1/page/search/${keyword}?page=${page}&size=${size}&sort=${sort}&remind=${remind}`
  );
  return response.data;
};

// 북마크 조회  folderId가 main 이면 모든 북마크 조회
export const getDotorisAPI = async (
  folderId: ItemId,
  page: number,
  size: number,
  sort: DotoriSortType,
  remind: boolean
) => {
  const response = await client.get<IDotoriListResponse>(
    `/api/v1/page/${folderId}?page=${page}&size=${size}&sort=${sort}&remind=${remind}`
  );
  return response.data;
};

// 북마크 정보 수정
export const updateDotoriAPI = async (requestData: DotoriUpdateRequest) => {
  const { bookmarkId } = requestData;
  const response = await client.patch(
    `/api/v1/bookmark/${bookmarkId}`,
    requestData
  );

  return response.data;
};

// 북마크 클릭 수
export const clickCountDotoriAPI = async (dotoriId: string) => {
  const response = await client.get(`/api/v1/bookmark/click/${dotoriId}`);
  return response.data;
};

// 북마크 삭제
export const deleteDotoriAPI = async (dotoriIdList: string[]) => {
  const response = await client.post(`/api/v1/bookmark/delete`, {
    idList: dotoriIdList,
  });
  return response.data;
};
