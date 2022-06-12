import { Button } from "components/common";
import Input from "components/common/Input";
import { palette } from "lib/styles/palette";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { authValidateSelector } from "stores/authValidate";
import styled from "styled-components";
import { AuthType } from "types/auth";
import AgreementForm from "./AgreementForm";
import { AuthErrorText } from "./AuthErrorText";
import useAuthForm from "./hooks/useAuthForm";

interface Props {
  AuthType: AuthType;
}

function AuthForm({ AuthType }: Props) {
  const authValidateState = useSelector(authValidateSelector);

  const { form, onChangeForm, onLogin, onSignup, errorMessage, onBlur } =
    useAuthForm();
  const { email, password } = form;
  const { authError, passwordError, emailError } = errorMessage;

  const isDisabled = useMemo(() => {
    return !(
      authValidateState.email &&
      authValidateState.isAgree &&
      authValidateState.password
    );
  }, [authValidateState]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return AuthType === "login" ? onLogin() : onSignup();
  };

  return (
    <AuthFormWrapper onSubmit={onSubmit}>
      <AuthFormRow>
        <Input
          width="100%"
          height="56px"
          borderRadius="8px"
          placeholder="이메일"
          type="email"
          name="email"
          onChange={onChangeForm}
          value={email}
          autoFocus
          className="auth-input"
          onBlur={AuthType === "signup" ? onBlur : undefined}
        />
        {emailError && <AuthErrorText>{emailError}</AuthErrorText>}
      </AuthFormRow>
      <AuthFormRow>
        <Input
          width="100%"
          height="56px"
          borderRadius="8px"
          placeholder="비밀번호"
          type="password"
          name="password"
          onChange={onChangeForm}
          value={password}
          className="auth-input"
          onBlur={AuthType === "signup" ? onBlur : undefined}
        />
        {passwordError && <AuthErrorText>{passwordError}</AuthErrorText>}
      </AuthFormRow>

      {AuthType === "signup" && <AgreementForm />}

      {!authValidateState.isAgree && (
        <AuthErrorText>
          이용약관 및 개인정보 수집 이용에 동의해주세요.
        </AuthErrorText>
      )}

      <AuthFormRow>
        <Button
          variant="primary"
          width="100%"
          height="56px"
          borderRadius="8px"
          className="auth-button"
          disabled={AuthType === "signup" ? isDisabled : false}
        >
          {AuthType === "login" ? "로그인" : "회원가입"}
        </Button>
        {authError && <AuthErrorText>{authError}</AuthErrorText>}
      </AuthFormRow>
    </AuthFormWrapper>
  );
}

const AuthFormWrapper = styled.form`
  .auth-input {
    padding: 15px 0 18px 24px;
    font-size: 16px;
    color: ${palette.grayDarkest};
  }
  .auth-button {
    font-size: 16px;
    margin-top: 20px;
  }
`;

const AuthFormRow = styled.div`
  margin-bottom: 20px;
`;

export default AuthForm;
