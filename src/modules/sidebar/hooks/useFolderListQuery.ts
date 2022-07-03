import { getFolderListAPI } from "lib/api/folder";
import { ReactQueryKey } from "lib/queryKey";
import { useQuery } from "react-query";

export type FolderQueryKindTypes = "sidebar" | "modal";

export default function useFolderListQuery(kind: FolderQueryKindTypes) {
  const query = useQuery(
    ReactQueryKey.folderList(kind),
    () => getFolderListAPI(),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      retry: false,
    }
  );

  return query;
}
