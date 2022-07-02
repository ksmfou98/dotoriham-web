import client from "lib/api/client";

interface GetShareFolderNameResponse {
  name: string;
}

export const getShareFolderName = async (folderToken: string) => {
  const response = await client.get<GetShareFolderNameResponse>(
    `/api/v1/folder/name/${folderToken}`
  );

  return response.data;
};
