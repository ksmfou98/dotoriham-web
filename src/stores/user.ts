import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "stores";
import { ISocialType } from "types/auth";

export interface IUserTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUserState extends IUserTokens {
  name: string;
  nickname: string;
  email: string;
  image: string;
  socialType: ISocialType;
  remindCycle: number;
  remindToggle: boolean;
  isRegistered: boolean;
}

// TODO 리마인드 쪽은 지금 첫 로그인하면 모든 정보를 다 가져오게 되어 있는데 리마인드 정보 조회 api가 완성되면 이제 마이페이지
// 접근할 때마다 새로운 리마인드 정보를 가져오도록 수정 할 예정

const initialState: IUserState = {
  name: "",
  nickname: "",
  email: "",
  image: "",
  socialType: null,
  remindCycle: 7,
  remindToggle: false,
  accessToken: "",
  refreshToken: "",
  isRegistered: false,
};

const user = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<IUserState>) => action.payload,
    setRemindToggle: (state, action: PayloadAction<boolean>) => {
      state.remindToggle = action.payload;
    },
    setRemindCycle: (state, action: PayloadAction<number>) => {
      state.remindCycle = action.payload;
    },
    removeUser: () => initialState,
  },
});

export const { setUser, removeUser, setRemindCycle, setRemindToggle } =
  user.actions;
export const userSelector = (state: rootState) => state.user;
export default user;
