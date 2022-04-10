import { ItemId } from "@atlaskit/tree";
import { getParentFolderListAPI } from "lib/api/folder";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expandedParentFolders, folderSelector } from "stores/folder";

export default function useInitialFolderExpand(folderId: ItemId) {
  const dispatch = useDispatch();
  const folder = useSelector(folderSelector);

  const onExpandParentFolders = useCallback(async () => {
    try {
      const parentFolderIdList = await getParentFolderListAPI(folderId);
      dispatch(expandedParentFolders({ parentFolderIdList }));
    } catch (e) {
      alert("부모 폴더 id 조회 실패");
    }
  }, [dispatch, folderId]);

  useEffect(() => {
    if (!folderId || !folder.rootId) return;
    onExpandParentFolders();
  }, [folderId, folder.rootId, onExpandParentFolders]);
}
