import { ItemId } from "@atlaskit/tree";
import {
  getDotorisAPI,
  getSearchDotorisAPI,
  getTrashDotorisAPI,
} from "lib/api/dotori";
import { ReactQueryKey } from "lib/queryKey";
import { useQuery } from "react-query";
import { DotoriSortType } from "types/dotori";

export type DotoriPathTypes = "main" | "trash" | "search" | "folder";

export default function useDotoriQuery(
  path: DotoriPathTypes,
  page: number,
  size: number,
  sort: DotoriSortType,
  remind: boolean,
  keyword?: string,
  folderId?: ItemId
) {
  const searchKeyword = keyword || "";
  const folderIdKey = folderId || "";
  const dynamicKey = searchKeyword || folderIdKey || "default";

  function dotoriAPI(path: DotoriPathTypes) {
    switch (path) {
      case "main":
        return getDotorisAPI("main", page, size, sort, remind);
      case "trash":
        return getTrashDotorisAPI(page, size, sort, remind);
      case "search":
        return getSearchDotorisAPI(searchKeyword, page, size, sort, remind);
      case "folder":
        return getDotorisAPI(folderIdKey, page, size, sort, remind);
      default:
        return undefined;
    }
  }

  const query = useQuery(
    ReactQueryKey.dotoriContents(path, dynamicKey, page, remind, sort),
    () => dotoriAPI(path),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      retry: false,
    }
  );

  return query;
}
