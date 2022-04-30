import userStorage from "lib/utils/userStorage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleTutorialGuide } from "stores/tutorial";

/**
 * @description 최초 회원가입시 나타나는 효과 (튜토리얼 모달)
 */

export default function useInitialRegisterEffect() {
  const user = userStorage.get();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    if (user.isRegistered) return;
    dispatch(toggleTutorialGuide({}));
    userStorage.set({ ...user, isRegistered: true });
  }, [user, dispatch]);
}
