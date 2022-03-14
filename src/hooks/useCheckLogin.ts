import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Path from "routes/Path";
import { userSelector } from "stores/user";

export default function useCheckLogin() {
  const navigate = useNavigate();
  const { accessToken } = useSelector(userSelector);
  useEffect(() => {
    if (!accessToken) navigate(Path.LoginPage);
  }, [accessToken, navigate]);
}
