import { DotoriPathTypes } from "hooks/dotori/useDotoriQuery";
import { FolderQueryKindTypes } from "hooks/folder/useFolderListQuery";
import { DotoriSortType } from "types/dotori";

export enum QueryKey {
  DOTORI_CONTENTS = "dotoriContents",
  FOLDER_LIST = "folderList",
}

export const ReactQueryKey = {
  dotoriContents: (
    path: DotoriPathTypes,
    dynamicKey: string | number,
    page: number,
    remind: boolean,
    sort: DotoriSortType
  ) =>
    [QueryKey.DOTORI_CONTENTS, path, dynamicKey, page, remind, sort] as const,
  folderList: (kind: FolderQueryKindTypes) =>
    [QueryKey.FOLDER_LIST, kind] as const,
};
