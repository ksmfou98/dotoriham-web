import { getFolderBelongUserListAPI } from "lib/api/folder";
import { ReactQueryKey } from "lib/queryKey";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function useFolderBelongMemberListQuery() {
  const { folderId = "" } = useParams<"folderId">();

  return useQuery(
    ReactQueryKey.folderBelongUserList(folderId),
    () => getFolderBelongUserListAPI(folderId),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    }
  );
}
