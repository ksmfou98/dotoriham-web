import { ItemId } from "@atlaskit/tree";

export interface ICreateFolderResponse {
  folderId: number;
}

export interface ICreateFolderRequest {
  parentId: ItemId;
  name: string;
  index: number;
}
