import { ItemId } from "@atlaskit/tree";
import { getParentFolderListAPI } from "lib/api/folder";
import { ReactQueryKey } from "lib/queryKey";
import { useQuery } from "react-query";

export default function usePagePathQuery(folderId: ItemId) {
  const query = useQuery(
    ReactQueryKey.pathPathList(folderId),
    () => getParentFolderListAPI(folderId),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      retry: false,
    }
  );

  return query;
}
