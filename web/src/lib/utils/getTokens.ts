import userStorage from "./userStorage";

export default function getTokens() {
  const user = userStorage.get();
  if (!user) return null;

  const { accessToken, refreshToken } = user;
  const tokens = {
    accessToken,
    refreshToken,
  };

  return tokens;
}
