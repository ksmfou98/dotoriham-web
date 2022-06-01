import Path from "routes/Path";
import userStorage from "./userStorage";

export function getTokens() {
  const user = userStorage.get();
  if (!user) return null;

  const { accessToken, refreshToken } = user;
  const tokens = {
    accessToken,
    refreshToken,
  };
  return tokens;
}

export function logout() {
  userStorage.remove();
  window.location.replace(Path.LoginPage);
}

export function isLogin() {
  const user = userStorage.get();
  if (!user) return false;

  const { accessToken } = user;
  return !!accessToken;
}
