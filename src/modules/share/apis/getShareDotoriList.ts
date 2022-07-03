import shareApi from "./shareApi";

export const getShareDotoriList = async (shareToken: string) => {
  const response = await shareApi.get(
    `/api/v1/page/open/${encodeURIComponent(shareToken)}`
  );

  return response.data;
};
