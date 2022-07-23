import { useToast } from "domains/@shared/hooks";
import { loginAPI, signupAPI } from "lib/api/auth";
import { getFCMToken } from "lib/firebase";
import userStorage from "lib/utils/userStorage";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Path from "routes/Path";
import { setAuthValidate } from "stores/authValidate";
import useAuthentication from "./useAuthentication";

export default function useAuthForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const {
    onEmailValidation,
    onPasswordValidation,
    onEmptyValidate,
    errorMessage,
    onChangeErrorMessage,
  } = useAuthentication();
  const { errorToast } = useToast();

  const onChangeForm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onChangeAuthState = useCallback(
    (name: string, value: boolean) => {
      dispatch(
        setAuthValidate({
          kind: name,
          value,
        })
      );

      return value;
    },
    [dispatch]
  );

  // 유효성 체크 (이메일이면 : 이메일 유효성 체크함수 비밀번호면: 비밀번호 유효성 체크함수)
  const onFormValidation = (name: string) => {
    return name === "email"
      ? onEmailValidation(email)
      : onPasswordValidation(password);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    return onChangeAuthState(name, onFormValidation(name));
  };

  const onLogin = async () => {
    if (!onEmptyValidate(email, password)) return false;
    // @TODO(dohyun): API 생기면 작성
    // 만약 실패했으면 onChangeAuthError("계정을 찾을 수 없습니다. 이메일 또는 비밀번호를 다시 확인해주세요") 호출
    // 아래는 테스트용
    try {
      const { data } = await loginAPI(email, password);
      userStorage.set(data);
      console.log(data);
      // window.location.replace(Path.DotoriPage);
    } catch (e) {
      onChangeErrorMessage(
        "authError",
        "계정을 찾을 수 없습니다. 이메일 또는 비밀번호를 다시 확인해주세요"
      );
    }

    // eslint-disable-next-line no-console
    console.log(form, "login");
    return true;
  };

  /**
   * 이메일 회원가입
   */
  const onSignup = async () => {
    const userFCMToken = await getFCMToken();
    try {
      const signupRequest = {
        ...form,
        fcmToken: userFCMToken,
      };
      const { data } = await signupAPI(signupRequest);
      userStorage.set(data);
      window.location.replace(Path.DotoriPage);
    } catch (e) {
      console.log(e);
      errorToast("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return {
    form,
    onChangeForm,
    onLogin,
    onSignup,
    errorMessage,
    onBlur,
  };
}
