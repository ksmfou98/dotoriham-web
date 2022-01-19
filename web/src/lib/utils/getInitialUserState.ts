import store from "stores";
import { setUser } from "stores/user";
import userStorage from "./userStorage";

export default function getInitialUserState() {
  try {
    const user = userStorage.get();
    if (!user) return;
    store.dispatch(setUser(user));
  } catch (e) {
    console.error(`getInitialUserState Error: ${e}`);
  }
}
