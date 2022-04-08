import { ItemId, TreeData } from "@atlaskit/tree";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findParentIdById } from "lib/utils/atlaskitTreeFinder";
import { rootState } from "stores";

export interface IFolderItem {
  id: ItemId;
  children: ItemId[];
  data: {
    name: string;
  };
}

export interface IAddFolderPayload {
  folderId: ItemId;
  parentId: ItemId;
  newFolderData: IFolderItem;
}

export const initialFolderState: TreeData = {
  rootId: "",
  items: {
    "": {
      id: "",
      children: [],
      data: "",
    },
  },
};

const folder = createSlice({
  name: "folderReducer",
  initialState: initialFolderState,
  reducers: {
    setFolders: (_, action: PayloadAction<TreeData>) => action.payload,
    addFolder: (state: TreeData, action: PayloadAction<IAddFolderPayload>) => {
      const { folderId, parentId, newFolderData } = action.payload;

      state.items[folderId] = newFolderData;
      state.items[parentId].children.push(folderId);
      if (parentId !== "root") {
        state.items[parentId].isExpanded = true;
      }
    },
    deleteFolder: (
      state: TreeData,
      action: PayloadAction<{ folderId: ItemId }>
    ) => {
      const { folderId } = action.payload;
      const parentId = findParentIdById(state, folderId);
      if (!parentId) return;
      state.items[parentId].children = state.items[parentId].children.filter(
        (id) => id !== folderId
      );
      delete state.items[folderId];
    },
    deleteFolders: (
      state: TreeData,
      action: PayloadAction<{ folderIdList: ItemId[] }>
    ) => {
      const { folderIdList } = action.payload;
      folderIdList.forEach((folderId) => {
        const parentId = findParentIdById(state, folderId);
        if (!parentId) return;
        state.items[parentId].children = state.items[parentId].children.filter(
          (id) => id !== folderId
        );
        delete state.items[folderId];
      });
    },
  },
});

export const { setFolders, addFolder, deleteFolder, deleteFolders } =
  folder.actions;
export const folderSelector = (state: rootState) => state.folder;
export default folder;
