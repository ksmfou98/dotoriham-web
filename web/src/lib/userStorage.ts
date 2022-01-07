const key = "USER";

const userStorage = {
  get() {
    const user = localStorage.getItem(key);
    try {
      if (!user) return null;
      const parsedUser = JSON.parse(user) as any; // 나중에 유저 타입 생기면 이쪽에 타입 설정
      return parsedUser;
    } catch (e) {
      localStorage.removeItem(key);
      return null;
    }
  },
  set(user: any) {
    localStorage.setItem(key, JSON.stringify(user));
  },
  remove() {
    localStorage.removeItem(key);
  },
};

export default userStorage;
