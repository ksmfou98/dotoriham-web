import { IUserState } from "stores/user";

export const USER_STORAGE_KEY = "DOTORI_USER";

const userStorage = {
  get() {
    const user = localStorage.getItem(USER_STORAGE_KEY);
    try {
      if (!user) return null;
      const parsedUser = JSON.parse(user) as IUserState;
      return parsedUser;
    } catch (e) {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  },
  set(user: IUserState) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },
  remove() {
    localStorage.removeItem(USER_STORAGE_KEY);
  },
};

export default userStorage;
