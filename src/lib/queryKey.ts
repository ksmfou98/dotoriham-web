import { FolderQueryKindTypes } from "components/sidebar/hooks/useFolderListQuery";
import { DotoriPathTypes, DotoriSortType } from "types/dotori";

export enum QueryKey {
  DOTORI_CONTENTS = "dotoriContents",
  FOLDER_LIST = "folderList",
  REMIND_LIST = "remindList",
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
  remindList: () => [QueryKey.REMIND_LIST] as const,
};
