import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getShareFolderName } from "../apis";

const QUERY_KEY = "shareFolderName";

export default function useShareFolderNameQuery() {
  const { shareToken = "" } = useParams<"shareToken">();

  return useQuery(
    [QUERY_KEY, shareToken],
    () => getShareFolderName(shareToken),
    {
      enabled: shareToken !== "",
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  );
}
