import { ItemId } from "@atlaskit/tree";
import { deleteChildFolderAPI } from "lib/api/folder";
import { QueryKey } from "lib/queryKey";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { deleteFolders } from "stores/folder";

export default function useChildFoldersMutation() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: mutateChildFoldersDelete } = useMutation(
    (deleteFolderIdList: ItemId[]) => deleteChildFolderAPI(deleteFolderIdList),
    {
      onSuccess: (_, variable) => {
        dispatch(deleteFolders({ folderIdList: variable }));
        queryClient.invalidateQueries(QueryKey.CHILD_FOLDER_LIST);
      },
      onError: () => {
        alert("자식 폴더 삭제를 실패했습니다.");
      },
    }
  );

  return {
    mutateChildFoldersDelete,
  };
}
