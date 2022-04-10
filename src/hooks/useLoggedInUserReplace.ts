import { isLogin } from "lib/utils/auth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Path from "routes/Path";

export default function useLoggedInUserReplace() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { LoginPage, RegisterPage } = Path;

  useEffect(() => {
    if (isLogin()) {
      if (pathname === LoginPage || pathname === RegisterPage) {
        navigate(Path.HomePage);
      }
    }
  }, [pathname, navigate, LoginPage, RegisterPage]);
}
