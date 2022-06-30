import { ItemId, TreeData } from "@atlaskit/tree";
import {
  ChildFolderItem,
  FolderBelongUserListResponse,
  FolderShareTokenResponse,
  ICreateFolderRequest,
  ICreateFolderResponse,
  IMoveFolderRequest,
  ParentFoldersGetResponse,
} from "types/folder";
import client from "./client";

// 폴더 리스트 조회
export const getFolderListAPI = async () => {
  const response = await client.get<TreeData>(`/api/v1/folder`);
  return response.data;
};

// 폴더 추가
export const createFolderAPI = async (body: ICreateFolderRequest) => {
  const response = await client.post<ICreateFolderResponse>(
    `/api/v1/folder`,
    body
  );
  return response.data;
};

// 폴더 정보 수정
export const updateFolderAPI = async (
  folderId: ItemId,
  name: string,
  emoji: string
) => {
  const response = await client.patch(`/api/v1/folder/${folderId}`, {
    name,
    emoji,
  });
  return response.data;
};

// 폴더 삭제
export const deleteFolderAPI = async (folderId: ItemId) => {
  const response = await client.delete(`/api/v1/folder/${folderId}`);
  return response.data;
};

// 폴더 이동
export const moveFolderAPI = async (body: IMoveFolderRequest) => {
  const response = await client.patch(
    `/api/v1/folder/${body.moveFolderId}/move`,
    body
  );
  return response.data;
};

// 부모 폴더 리스트 조회
export const getParentFolderListAPI = async (folderId: ItemId) => {
  const response = await client.get<ParentFoldersGetResponse>(
    `/api/v1/folder/${folderId}/parent`
  );
  return response.data;
};

// 자식 폴더 리스트 조회
export const getChildFolderListAPI = async (folderId: ItemId) => {
  const response = await client.get<ChildFolderItem[]>(
    `/api/v1/folder/${folderId}/children`
  );
  return response.data;
};

// 자식 폴더 삭제
export const deleteChildFolderAPI = async (deleteFolderIdList: ItemId[]) => {
  const response = await client.post(`/api/v1/folder/deletes`, {
    deleteFolderIdList,
  });
  return response.data;
};

// 폴더 공유 토큰 발급
export const getFolderShareTokenAPI = async (folderId: ItemId) => {
  const response = await client.get<FolderShareTokenResponse>(
    `/api/v1/folder/encrypt/${folderId}`
  );
  return response.data;
};

// 폴더에 가입한 유저 목록 조회
export const getFolderBelongUserListAPI = async (folderId: ItemId) => {
  const response = await client.get<FolderBelongUserListResponse>(
    `/api/v1/folder/belong/${folderId}`
  );
  return response.data;
};
