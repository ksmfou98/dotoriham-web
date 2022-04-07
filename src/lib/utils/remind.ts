import userStorage from "./userStorage";

export function changeRemindToggleLocalInfo(isRemind: boolean) {
  const userInfo = userStorage.get();
  if (!userInfo) return;
  const newUserInfo = {
    ...userInfo,
    remindToggle: isRemind,
  };
  userStorage.set(newUserInfo);
}

export function changeRemindCycleLocalInfo(cycle: number) {
  const userInfo = userStorage.get();
  if (!userInfo) return;
  const newUserInfo = {
    ...userInfo,
    remindCycle: cycle,
  };
  userStorage.set(newUserInfo);
}
