import { ItemId } from "@atlaskit/tree";
import { FolderQueryKindTypes } from "domains/sidebar/hooks/useFolderListQuery";
import { DotoriPathTypes, DotoriSortType } from "types/dotori";

export const QueryKey = {
  DOTORI_CONTENTS: "dotoriContents" as const,
  FOLDER_LIST: "folderList" as const,
  REMIND_LIST: "remindList" as const,
  PATH_PATH_LIST: "pathPathList" as const,
  CHILD_FOLDER_LIST: "childfolderList" as const,
  REMIND_ALARM_LIST: "remindAlarmList" as const,
  FOLDER_BELONG_USER_LIST: "folderBelongUserList" as const,
};

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
  pathPathList: (folderId: ItemId) =>
    [QueryKey.PATH_PATH_LIST, folderId] as const,
  childFolderList: (folderId: ItemId) =>
    [QueryKey.CHILD_FOLDER_LIST, folderId] as const,
  remindAlarmList: () => [QueryKey.REMIND_ALARM_LIST] as const,
  folderBelongUserList: (folderId: ItemId) =>
    [QueryKey.FOLDER_BELONG_USER_LIST, folderId] as const,
};
