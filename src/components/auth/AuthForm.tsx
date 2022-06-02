import { Button } from "components/common";
import Input from "components/common/Input";
import { palette } from "lib/styles/palette";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authValidateSelector } from "stores/authValidate";
import styled from "styled-components";
import { AuthType } from "types/auth";
import AgreementForm from "./AgreementForm";
import useAuthForm from "./hooks/useAuthForm";

interface Props {
  AuthType: AuthType;
}

function AuthForm({ AuthType }: Props) {
  const [disabled, setDisabled] = useState(true);
  //   const AuthState = useRecoilValue(authState);
  const authValidateState = useSelector(authValidateSelector);

  const { form, onChangeForm, onLogin, onRegister, errorMessage, onBlur } =
    useAuthForm();
  const { email, password } = form;
  const { authError, passwordError, emailError } = errorMessage;

  useEffect(() => {
    const isDisabled =
      authValidateState.email &&
      authValidateState.isAgree &&
      authValidateState.password;
    setDisabled(!isDisabled);
  }, [authValidateState]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return AuthType === "login" ? onLogin() : onRegister();
  };

  return (
    <AuthFormWrapper onSubmit={onSubmit}>
      <AuthFormRow>
        <AuthInput
          width="100%"
          height="56px"
          borderRadius="8px"
          placeholder="이메일"
          type="email"
          name="email"
          onChange={onChangeForm}
          value={email}
          onBlur={AuthType === "signup" ? onBlur : undefined}
        />
        {/* {emailError && <ErrorText text={emailError} />} */}
      </AuthFormRow>
      <AuthFormRow>
        <AuthInput
          width="100%"
          height="56px"
          borderRadius="8px"
          placeholder="비밀번호"
          type="password"
          name="password"
          onChange={onChangeForm}
          value={password}
          onBlur={AuthType === "signup" ? onBlur : undefined}
        />
        {/* {passwordError && <ErrorText text={passwordError} />} */}
        {/* {authError && <ErrorText text={authError} />} */}
      </AuthFormRow>

      {AuthType === "signup" && <AgreementForm />}

      <AuthFormRow>
        <AuthButton
          variant="primary"
          width="100%"
          height="56px"
          borderRadius="8px"
          disabled={AuthType === "signup" ? disabled : false}
        >
          {AuthType === "login" ? "로그인" : "회원가입"}
        </AuthButton>
      </AuthFormRow>
    </AuthFormWrapper>
  );
}

const AuthFormWrapper = styled.form``;

const AuthFormRow = styled.div`
  margin-bottom: 20px;
`;

const AuthInput = styled(Input)`
  padding: 15px 0 18px 24px;
  font-size: 16px;
  color: ${palette.grayDarkest};
  &::placeholder {
    color: ${palette.grayDark};
  }
`;

const AuthButton = styled(Button)`
  font-size: 16px;
`;

export default AuthForm;
