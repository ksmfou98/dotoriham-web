import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import dotori from "./dotori";
import folder from "./folder";
import user from "./user";

const rootReducer = combineReducers({
  user: user.reducer,
  dotori: dotori.reducer,
  folder: folder.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type rootState = ReturnType<typeof rootReducer>;

export default store;
