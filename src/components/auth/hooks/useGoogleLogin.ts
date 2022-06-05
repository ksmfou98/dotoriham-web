import { oauthLoginAPI } from "lib/api/auth";
import { GOOGLE_CLIENT_ID } from "lib/constants";
import userStorage from "lib/utils/userStorage";
import { useCallback } from "react";
import Path from "routes/Path";
import { OAuthLoginRequest } from "types/auth";

export default function useGoogleLogin() {
  const onGoogleLogin = useCallback(async (response) => {
    const {
      profileObj: { email, imageUrl, name },
    } = response;

    const loginRequest: OAuthLoginRequest = {
      email,
      image: imageUrl,
      name,
      socialType: "google",
      fcmToken: "null",
    };

    try {
      const { data } = await oauthLoginAPI(loginRequest);
      userStorage.set(data);
      window.location.replace(Path.DotoriPage);
    } catch (e) {
      console.log("로그인에 실패 하였습니다.");
    }
  }, []);
  return {
    onGoogleLogin,
    clientId: GOOGLE_CLIENT_ID,
  };
}
