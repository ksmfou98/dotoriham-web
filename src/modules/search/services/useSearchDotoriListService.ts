import { DotoriSortType } from "types/dotori";
import { useQueryString } from "modules/@shared/hooks";
import { useQuery } from "react-query";
import { getSearchDotoriList } from "../apis";

interface QueryParams {
  keyword: string;
  page: number;
  size: number;
  sort: DotoriSortType;
  remind: boolean;
}

const SearchDotoriListSize = 12;

export default function useSearchDotoriListService() {
  const {
    keyword = "",
    page = 0,
    remind = false,
    size = SearchDotoriListSize,
    sort = "saveTime,desc",
  } = useQueryString<QueryParams>();

  const { data = [] } = useQuery(
    ["searchDotoriList", keyword, page, remind, size, sort],
    () => getSearchDotoriList({ keyword, page, remind, size, sort }),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      retry: false,
      select: (data) => data.content,
    }
  );

  console.log({ data });

  return {
    data,
  };
}
