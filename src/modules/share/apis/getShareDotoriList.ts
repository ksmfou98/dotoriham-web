import { IDotoriListResponse } from "types/dotori";
import shareApi from "./shareApi";

type GetShareDotoriListResponse = IDotoriListResponse;

export const getShareDotoriList = async (shareToken: string) => {
  const response = await shareApi.get<GetShareDotoriListResponse>(
    `/api/v1/page/open/${encodeURIComponent(shareToken)}`
  );

  return response.data;
};
