import { ItemId } from "@atlaskit/tree";
import { getChildFolderListAPI } from "lib/api/folder";
import { ReactQueryKey } from "lib/queryKey";
import { useQuery } from "react-query";

export default function useChildFoldersQuery(folderId: ItemId) {
  const query = useQuery(
    ReactQueryKey.childFolderList(folderId),
    () => getChildFolderListAPI(folderId),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  );

  return query;
}
