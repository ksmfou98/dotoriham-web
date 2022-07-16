import client from "lib/api/client";
import { DotoriList, DotoriSortType } from "types/dotori";

interface RequestData {
  keyword: string;
  page: number;
  size: number;
  sort: DotoriSortType;
  remind: boolean;
}

type ResponseData = DotoriList;

export const getSearchDotoriList = async (requestData: RequestData) => {
  const { keyword, page, remind, size, sort } = requestData;

  const response = await client.get<ResponseData>(
    `/api/v1/page/search/${keyword}?page=${page}&size=${size}&sort=${sort}&remind=${remind}`
  );

  return response.data;
};
