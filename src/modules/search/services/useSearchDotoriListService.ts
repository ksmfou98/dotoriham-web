import { ReactQueryKey } from "lib/queryKey";
import { useQuery } from "react-query";
import { getSearchDotoriList } from "../apis";
import useSearchQueryParams from "../hooks/useSearchQueryParams";

const SearchDotoriListSize = 12;

export default function useSearchDotoriListService() {
  const { keyword, page, remind, sort } = useSearchQueryParams();

  const { data } = useQuery(
    ReactQueryKey.dotoriContents("search", keyword, page, remind, sort),
    () =>
      getSearchDotoriList({
        keyword,
        page,
        remind,
        size: SearchDotoriListSize,
        sort,
      }),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      retry: false,
    }
  );

  return {
    data,
  };
}
