import { TreeData } from "@atlaskit/tree";
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
