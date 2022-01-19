import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "stores";
import { IDotoriItem } from "types/dotori";

const initialState: IDotoriItem[] = [];

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
