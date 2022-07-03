import { useRef, useState } from "react";

type ErrorMessageType = "emailError" | "passwordError" | "authError";

export default function useAuthentication() {
  const [errorMessage, setErrorMessage] = useState({
    emailError: null,
    passwordError: null,
    authError: null,
  });
  const validCount = useRef(0);

  // 에러 메세지 변경 함수
  const onChangeErrorMessage = (
    type: ErrorMessageType,
    message: string | null
  ) => {
    setErrorMessage((prev) => ({
      ...prev,
      [type]: message,
    }));
  };

  // 이메일 비어있는지 검증 함수
  const onEmptyValidateEmail = (email: string) => {
    if (email === "") {
      onChangeErrorMessage("emailError", "이메일을 입력해주세요.");
      return false;
    }
    onChangeErrorMessage("emailError", null);
    return true;
  };

  // 비밀번호 비어있는지 검증 함수
  const onEmptyValidatePassword = (password: string) => {
    if (password === "") {
      onChangeErrorMessage("passwordError", "비밀번호를 입력해주세요.");
      return false;
    }
    onChangeErrorMessage("passwordError", null);
    return true;
  };

  // 이메일 중복확인 함수 (아직 구현X  API 생기면 구현)
  const onCheckEmailExist = (email: string) => {
    // @TODO(dohyun) 이미 가입한 이메일인지 아닌지 백앤드에 요청후 결과를 받아온다.
    // 만약 존재하는 이메일일 경우 setEmailError("이미 가입한 이메일 주소입니다") 같은 멘트 넣어주면 됌
    if (email) {
      return true;
    }
    return false;
  };

  // 이메일 형식 검증 함수
  const onCheckEmailValid = (email: string) => {
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexEmail.test(String(email).toLowerCase())) {
      onChangeErrorMessage("emailError", null);
      return true;
    }
    onChangeErrorMessage("emailError", "이메일 형식이 올바르지 않습니다.");
    return false;
  };

  // 비밀번호 형식 검증 함수
  const onCheckPasswordValid = (password: string) => {
    const regexNum = /[0-9]/;
    const regexEng = /[a-zA-Z]/;
    const regexSpe = /[~!@#$%^&*()_+|<>?:{}=-]/;
    validCount.current = 0;
    if (regexNum.test(password)) validCount.current += 1;
    if (regexEng.test(password)) validCount.current += 1;
    if (regexSpe.test(password)) validCount.current += 1;

    if (password.length < 8 || password.length > 16 || validCount.current < 2) {
      onChangeErrorMessage(
        "passwordError",
        "영문 대소문자, 숫자, 특수문자 중 2종류 이상을 조합하여 8~16자의 비밀번호를 생성해주세요."
      );
      return false;
    }
    onChangeErrorMessage("passwordError", null);
    return true;
  };

  // 이메일, 비밀번호 둘중 하나라도 비어있으면 false 반환
  const onEmptyValidate = (email: string, password: string) => {
    return onEmptyValidateEmail(email) && onEmptyValidatePassword(password);
  };

  // 이메일 유효성 체크
  const onEmailValidation = (email: string) => {
    return (
      onEmptyValidateEmail(email) &&
      onCheckEmailExist(email) &&
      onCheckEmailValid(email)
    );
  };

  // 비밀번호 유효성 체크
  const onPasswordValidation = (password: string) => {
    return onEmptyValidatePassword(password) && onCheckPasswordValid(password);
  };

  return {
    errorMessage,
    onChangeErrorMessage,
    onEmptyValidate,
    onEmailValidation,
    onPasswordValidation,
  };
}
