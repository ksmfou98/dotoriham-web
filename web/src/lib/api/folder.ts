import { ItemId, TreeData } from "@atlaskit/tree";
import { ICreateFolderRequest, ICreateFolderResponse } from "types/folder";
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
  return response;
};
