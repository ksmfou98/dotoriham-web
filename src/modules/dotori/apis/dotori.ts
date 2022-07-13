import { ItemId } from "@atlaskit/tree";
import {
  DotoriAddRequest,
  DotoriMoveRequest,
  DotoriSortType,
  DotoriUpdateRequest,
  IDotoriListResponse,
} from "types/dotori";
import client from "../../../lib/api/client";

// 휴지통 도토리 조회
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

// 검색 결과 도토리 조회
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

// 도토리 조회  folderId가 main 이면 모든 도토리 조회
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

// 도토리 정보 수정
export const updateDotoriAPI = async (requestData: DotoriUpdateRequest) => {
  const { dotoriId } = requestData;
  const response = await client.patch(
    `/api/v1/bookmark/${dotoriId}`,
    requestData
  );

  return response.data;
};

// 도토리 클릭 수
export const clickCountDotoriAPI = async (dotoriId: string) => {
  const response = await client.get(`/api/v1/bookmark/click/${dotoriId}`);
  return response.data;
};

// 도토리 삭제
export const deleteDotoriAPI = async (dotoriIdList: string[]) => {
  const response = await client.post(`/api/v1/bookmark/delete`, {
    dotoriIdList,
  });
  return response.data;
};

// 도토리 이동
export const moveDotoriAPI = async (requestData: DotoriMoveRequest) => {
  const response = await client.post(`/api/v1/bookmark/moveList`, requestData);
  return response.data;
};

// @Note 도토리 복원
export const restoreDotoriAPI = async (dotoriIdList: string[]) => {
  const response = await client.patch(`/api/v1/trash/restore`, {
    bookmarkIdList: dotoriIdList,
  });
  return response.data;
};

// @Note 도토리 영구 삭제
export const truncateDotoriAPI = async (dotoriIdList: string[]) => {
  const response = await client.post(`/api/v1/trash/truncate`, {
    bookmarkIdList: dotoriIdList,
  });
  return response.data;
};

// @Note 북마크 추가
export const addDotoriAPI = async (requestData: DotoriAddRequest) => {
  const response = await client.post(
    `/api/v1/bookmark/list?folderId=${requestData.folderId}`,
    requestData
  );

  return response.data;
};
