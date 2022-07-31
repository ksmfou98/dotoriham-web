import { ItemId } from "@atlaskit/tree";
import { deleteFolderAPI } from "lib/api/folder";
import { QueryKey } from "lib/queryKey";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { deleteFolder } from "stores/folder";

export default function useDeleteFolder(folderId: ItemId) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteFolder } = useMutation(
    () => deleteFolderAPI(folderId),
    {
      onSuccess: () => {
        dispatch(deleteFolder({ folderId }));
        queryClient.invalidateQueries(QueryKey.CHILD_FOLDER_LIST);
      },
      onError: () => {
        alert("폴더 삭제를 실패했습니다. 잠시 후 다시 시도해 주세요");
      },
    }
  );

  return {
    mutateDeleteFolder,
  };
}
