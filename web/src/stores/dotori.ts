import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "stores";
import { IDotoriItem } from "types/dotori";

const initialState: IDotoriItem[] = [
  {
    clickCount: 0,
    deleteTime: "",
    deleted: false,
    description: "",
    folder: "",
    folderId: "",
    id: "",
    link: "",
    remindTime: "",
    saveTime: "",
    title: "",
    userId: 0,
    image: "",
    folderName: "",
    folderEmoji: "",
    checked: false,
    nickname: "",
  },
];

const dotori = createSlice({
  name: "dotoriReducer",
  initialState,
  reducers: {
    setDotoris: (_, action: PayloadAction<IDotoriItem[]>) => action.payload,
  },
});

export const { setDotoris } = dotori.actions;
export const dotoriSelector = (state: rootState) => state.dotori;
export default dotori;
