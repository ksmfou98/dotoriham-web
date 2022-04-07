import { ItemId } from "@atlaskit/tree";

export interface ICreateFolderResponse {
  folderId: number;
}

export interface ICreateFolderRequest {
  parentId: ItemId;
  name: string;
  index: number;
}

export interface IMoveFolderRequest {
  moveFolderId: ItemId;
  prevParentId: ItemId;
  nextParentId: ItemId;
  prevIndex: ItemId;
  nextIndex: ItemId;
}

export interface ChildFolderItem {
  folderId: ItemId;
  name: string;
  emoji: string;
}

export type ParentFoldersGetResponse = ChildFolderItem[];


