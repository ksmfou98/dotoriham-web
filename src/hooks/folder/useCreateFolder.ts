import { ItemId } from "@atlaskit/tree";
import { createFolderAPI } from "lib/api/folder";
import { findChildrenLengthById } from "lib/utils/atlaskitTreeFinder";
import { useDispatch, useSelector } from "react-redux";
import { addFolder, folderSelector } from "stores/folder";
import { ICreateFolderRequest } from "types/folder";

export default function useCreateFolder() {
  const folders = useSelector(folderSelector);
  const dispatch = useDispatch();

  // 새로운 폴더 데이터 생성
  const createNewFolderData = (folderId: ItemId, name: string) => {
    return {
      id: folderId,
      children: [],
      data: {
        name,
      },
    };
  };

  // 폴더 생성 (parentId가 없으면(root) 보관함 생성)
  const onCreateFolder = async (parentId: ItemId = "root") => {
    const folderChildrenLength = findChildrenLengthById(folders, parentId);
    const folderName =
      parentId === "root" ? `보관함${folderChildrenLength + 1}` : "제목없음";

    const requestBody: ICreateFolderRequest = {
      parentId: parentId === "root" ? 0 : parentId,
      name: folderName,
      index: folderChildrenLength,
    };
    try {
      const { folderId } = await createFolderAPI(requestBody);
      const newFolderData = createNewFolderData(folderId, requestBody.name);
      dispatch(addFolder({ folderId, parentId, newFolderData }));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    onCreateFolder,
  };
}
