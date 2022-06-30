import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "stores";

export interface AuthValidateState {
  email: boolean;
  password: boolean;
  isAgree: boolean;
}

export const initialAuthValidateState: AuthValidateState = {
  email: false,
  password: false,
  isAgree: false,
};

interface AuthValidateAction {
  kind: string;
  value: boolean;
}

const authValidate = createSlice({
  name: "authValidate",
  initialState: initialAuthValidateState,
  reducers: {
    setAuthValidate: (state, action: PayloadAction<AuthValidateAction>) => {
      switch (action.payload.kind) {
        case "email":
          state.email = action.payload.value;
          break;
        case "password":
          state.password = action.payload.value;
          break;
        case "isAgree":
          state.isAgree = action.payload.value;
          break;
      }
    },
  },
});

export const { setAuthValidate } = authValidate.actions;
export const authValidateSelector = (state: rootState) => state.authValidate;
export default authValidate;
