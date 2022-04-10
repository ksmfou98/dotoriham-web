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

export function getLastTimeString(lastTime: string) {
  const now = new Date().getTime();
  const before = new Date(lastTime).getTime();
  const diffTime = Math.floor(now - before);
  const diffMinute = Math.floor(diffTime / 60000);
  const diffHour = Math.floor(diffTime / 60000 / 60);
  const diffDay = Math.floor(diffTime / 60000 / 60 / 24);
  if (diffMinute < 1) {
    return `NEW`;
  }

  if (diffMinute < 60) {
    return `${diffMinute}분 전`;
  }

  if (diffHour < 24) {
    return `${diffHour}시간 전`;
  }

  if (diffDay < 4) {
    return `${diffDay}일 전`;
  }

  return `오래 전`;
}
