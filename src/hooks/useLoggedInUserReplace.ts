import { isLogin } from "lib/utils/auth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Path from "routes/Path";

/**
 * @description 로그인이 되어있으면 로그인, 회원가입 페이지에서 접근 막기
 */

export default function useLoggedInUserReplace() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { LoginPage, SignupPage } = Path;

  useEffect(() => {
    if (isLogin()) {
      if (pathname === LoginPage || pathname === SignupPage) {
        navigate(Path.HomePage);
      }
    }
  }, [pathname, navigate, LoginPage, SignupPage]);
}
