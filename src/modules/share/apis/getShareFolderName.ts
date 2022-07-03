import shareApi from "./shareApi";

interface GetShareFolderNameResponse {
  name: string;
}

export const getShareFolderName = async (folderToken: string) => {
  const response = await shareApi.get<GetShareFolderNameResponse>(
    `/api/v1/folder/name/${folderToken}`
  );

  return response.data;
};
