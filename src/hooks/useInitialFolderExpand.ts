import { ItemId } from "@atlaskit/tree";
import usePagePathQuery from "components/pagePath/hooks/usePagePathQuery";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expandedParentFolders, folderSelector } from "stores/folder";

export default function useInitialFolderExpand(folderId: ItemId) {
  const dispatch = useDispatch();
  const { data } = usePagePathQuery(folderId!);
  const folder = useSelector(folderSelector);

  useEffect(() => {
    if (!data || !folder.rootId) return;
    dispatch(expandedParentFolders({ parentFolderIdList: data }));
  }, [data, folder.rootId, dispatch, folderId]);
}
