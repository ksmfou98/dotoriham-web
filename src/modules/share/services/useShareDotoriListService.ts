import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getShareDotoriList } from "../apis";

const QUERY_KEY = "shareDotoriList";

export default function useShareDotoriListService() {
  const { shareToken = "" } = useParams<"shareToken">();

  return useQuery(
    [QUERY_KEY, shareToken],
    () => getShareDotoriList(shareToken),
    {
      enabled: shareToken !== "",
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  );
}
