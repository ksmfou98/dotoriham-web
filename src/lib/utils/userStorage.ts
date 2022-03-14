import { USER_STORAGE_KEY } from "lib/constants";
import { IUserState } from "stores/user";

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
