import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "stores";
import { ISocialType } from "types/auth";

export interface IUserState {
  name: string;
  nickname: string;
  email: string;
  image: string;
  socialType: ISocialType;
  remindCycle: number;
  remindToggle: boolean;
  accessToken: string;
  refreshToken: string;
  isRegisterd: boolean;
}

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
