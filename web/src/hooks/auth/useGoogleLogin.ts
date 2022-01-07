import { GOOGLE_CLIENT_ID } from "lib/const";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function useGoogleLogin() {
  const navigate = useNavigate();

  const onGoogleLogin = useCallback(async (response) => {
    const { profileObj } = response;
    console.log(profileObj);
  }, []);
  return {
    onGoogleLogin,
    clientId: GOOGLE_CLIENT_ID,
  };
}
