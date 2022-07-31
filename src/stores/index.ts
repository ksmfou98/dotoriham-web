import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authValidate from "./authValidate";
import dotori from "./dotori";
import folder from "./folder";
import mobileHeader from "./mobileHeader";
import tutorial from "./tutorial";
import user from "./user";

const rootReducer = combineReducers({
  user: user.reducer,
  dotori: dotori.reducer,
  folder: folder.reducer,
  tutorial: tutorial.reducer,
  authValidate: authValidate.reducer,
  mobileHeader: mobileHeader.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type rootState = ReturnType<typeof rootReducer>;

export default store;
