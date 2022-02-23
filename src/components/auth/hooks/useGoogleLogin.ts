import { loginAPI } from "lib/api/auth";
import { GOOGLE_CLIENT_ID } from "lib/constants";
import userStorage from "lib/utils/userStorage";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Path from "routes/Path";
import { setUser } from "stores/user";
import { ILoginRequest } from "types/auth";

export default function useGoogleLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onGoogleLogin = useCallback(
    async (response) => {
      const {
        profileObj: { email, imageUrl, name },
      } = response;

      const loginRequest: ILoginRequest = {
        email,
        image: imageUrl,
        name,
        socialType: "google",
        fcmToken: "null",
      };

      try {
        const { data } = await loginAPI(loginRequest);
        userStorage.set(data);
        dispatch(setUser(data));
        navigate(Path.DotoriPage);
      } catch (e) {
        console.log("로그인에 실패 하였습니다.");
      }
    },
    [dispatch, navigate]
  );
  return {
    onGoogleLogin,
    clientId: GOOGLE_CLIENT_ID,
  };
}
