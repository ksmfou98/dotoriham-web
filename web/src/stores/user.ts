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
  isRegisterd: boolean;
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
  isRegisterd: false,
};

const user = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUser: (state: IUserState, action: PayloadAction<IUserState>) => {
      const {
        email,
        name,
        image,
        isRegisterd,
        remindCycle,
        remindToggle,
        socialType,
        nickname,
        accessToken,
        refreshToken,
      } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.email = email;
      state.image = image;
      state.isRegisterd = isRegisterd;
      state.name = name;
      state.nickname = nickname;
      state.remindCycle = remindCycle;
      state.remindToggle = remindToggle;
      state.socialType = socialType;
    },
    removeUser: () => initialState,
  },
});

export const { setUser, removeUser } = user.actions;
export const userSelector = (state: rootState) => state.user;
export default user;
