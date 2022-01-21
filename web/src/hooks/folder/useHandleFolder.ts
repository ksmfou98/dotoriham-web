import { findChildrenLengthById } from "lib/utils/atlaskitTreeFinder";
import { useSelector } from "react-redux";
import { folderSelector } from "stores/folder";
import { ICreateFolderRequest } from "types/folder";
import useMutationFolder from "./useMutationFolder";

export default function useHandleFolder() {
  const folders = useSelector(folderSelector);
  const { createFolderMutate } = useMutationFolder();

  // 보관함 생성
  const onCreateCabinet = () => {
    const folderChildrenLength = findChildrenLengthById(folders, "root");
    const requestBody: ICreateFolderRequest = {
      parentId: 0,
      name: `보관함${folderChildrenLength + 1}`,
      index: folderChildrenLength,
    };

    createFolderMutate(requestBody);
  };

  return {
    onCreateCabinet,
  };
}
