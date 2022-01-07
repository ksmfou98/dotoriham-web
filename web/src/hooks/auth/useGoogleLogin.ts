import { loginAPI } from "lib/api/auth";
import { GOOGLE_CLIENT_ID } from "lib/const";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "stores/user";
import { ILoginRequest } from "types/auth";

export default function useGoogleLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onGoogleLogin = useCallback(async (response) => {
    const { profileObj } = response;
    console.log(profileObj);
    const { email, imageUrl, name } = profileObj;
    const loginRequest: ILoginRequest = {
      email,
      image: imageUrl,
      name,
      socialType: "google",
      fcmToken: "null",
    };

    try {
      const response = await loginAPI(loginRequest);
      console.log(response);
      dispatch(setUser(response.data));
    } catch (e) {
      console.log("로그인에 실패 하였습니다.");
    }
  }, []);
  return {
    onGoogleLogin,
    clientId: GOOGLE_CLIENT_ID,
  };
}
