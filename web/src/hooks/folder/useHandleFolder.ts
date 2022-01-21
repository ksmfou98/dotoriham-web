import { ItemId } from "@atlaskit/tree";
import { createFolderAPI } from "lib/api/folder";
import { findChildrenLengthById } from "lib/utils/atlaskitTreeFinder";
import { useDispatch, useSelector } from "react-redux";
import { addFolder, folderSelector } from "stores/folder";
import { ICreateFolderRequest } from "types/folder";

export default function useHandleFolder() {
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

  // 보관함 생성
  const onCreateCabinet = async () => {
    const folderChildrenLength = findChildrenLengthById(folders, "root");
    const requestBody: ICreateFolderRequest = {
      parentId: 0,
      name: `보관함${folderChildrenLength + 1}`,
      index: folderChildrenLength,
    };

    try {
      const { folderId } = await createFolderAPI(requestBody);
      const newFolderData = createNewFolderData(folderId, requestBody.name);
      dispatch(addFolder({ folderId, parentId: "root", newFolderData }));
    } catch (e) {
      console.error(e);
    }
  };

  // 폴더 생성
  const onCreateFolder = async (parentId: ItemId) => {
    const folderChildrenLength = findChildrenLengthById(folders, parentId);
    const requestBody: ICreateFolderRequest = {
      parentId,
      name: "제목없음",
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
    onCreateCabinet,
    onCreateFolder,
  };
}
