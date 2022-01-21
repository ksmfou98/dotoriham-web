import { ItemId, TreeData } from "@atlaskit/tree";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: TreeData = {
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
  initialState,
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
  },
});

export const { setFolders, addFolder } = folder.actions;
export const folderSelector = (state: rootState) => state.folder;
export default folder;
