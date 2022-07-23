import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Path from "routes/Path";
import { userSelector } from "stores/user";

/**
 * @description 로그인 여부를 검사하고, 로그인이 안되어 있으면 로그인 페이지로 이동
 */

export default function useCheckLogin() {
  const navigate = useNavigate();
  const { accessToken } = useSelector(userSelector);
  useEffect(() => {
    if (!accessToken) navigate(Path.LoginPage);
  }, [accessToken, navigate]);
}
