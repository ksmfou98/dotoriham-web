import { useQueryString } from "domains/@shared/hooks";
import { DotoriSortType } from "domains/@shared/models";

interface QueryParams {
  keyword: string;
  page: number;
  sort: DotoriSortType;
  remind: boolean;
}

export default function useSearchQueryParams() {
  const {
    keyword = "",
    page = 0,
    remind = false,
    sort = "saveTime,desc",
  } = useQueryString<QueryParams>();

  return {
    keyword,
    page: Number(page),
    remind:
      typeof remind === "string" ? (JSON.parse(remind) as boolean) : remind,
    sort,
  };
}
