import { TreeData } from "@atlaskit/tree";
import client from "./client";

// 폴더 리스트 조회
export const getFolderListAPI = async () => {
  const response = await client.get<TreeData>(`/api/v1/folder`);
  return response.data;
};
