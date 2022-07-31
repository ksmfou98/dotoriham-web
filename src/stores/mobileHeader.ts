import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "stores";

export interface MobileHeaderState {
  isShowRightMenu?: boolean;
  leftMenu?: "back" | "menu" | null;
  title?: string;
}

const initialState: MobileHeaderState = {
  isShowRightMenu: false,
  leftMenu: "back",
  title: "제주도 여행",
};

const mobileHeader = createSlice({
  name: "mobileHeader",
  initialState,
  reducers: {
    setMobileHeader: (_, action: PayloadAction<MobileHeaderState>) =>
      action.payload,
  },
});

export const { setMobileHeader } = mobileHeader.actions;
export const mobileHeaderSelector = (state: rootState) => state.mobileHeader;
export default mobileHeader;
