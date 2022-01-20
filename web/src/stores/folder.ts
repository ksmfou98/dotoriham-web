import { TreeData } from "@atlaskit/tree";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "stores";

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
  },
});

export const { setFolders } = folder.actions;
export const folderSelector = (state: rootState) => state.folder;
export default folder;
