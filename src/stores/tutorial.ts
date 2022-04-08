import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "stores";

export interface TutorialState {
  isGuide: boolean;
  isAlarm: boolean;
}

const initialState: TutorialState = {
  isGuide: false,
  isAlarm: false,
};

const tutorial = createSlice({
  name: "tutorialReducer",
  initialState,
  reducers: {
    toggleTutorialGuide: (state, _) => {
      state.isGuide = !state.isGuide;
    },
    toggleTutorialAlarm: (state, _) => {
      state.isAlarm = !state.isAlarm;
    },
  },
});

export const { toggleTutorialGuide, toggleTutorialAlarm } = tutorial.actions;
export const tutorialSelector = (state: rootState) => state.tutorial;
export default tutorial;
