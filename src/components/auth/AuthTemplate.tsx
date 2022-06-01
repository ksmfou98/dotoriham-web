import React from "react";
import styled from "styled-components";
import { AuthType } from "types/auth";
import AuthDivider from "./AuthDivider";
import AuthForm from "./AuthForm";
import AuthTitle from "./AuthTitle";
import GoogleLoginButton from "./GoogleLoginButton";

interface AuthTemplateProps {
  AuthType: AuthType;
}

function AuthTemplate({ AuthType }: AuthTemplateProps) {
  return (
    <>
      <AuthTitle AuthType={AuthType} />
      <AuthInner>
        <GoogleLoginButton />
        <AuthDivider />
        <AuthForm AuthType={AuthType} />
      </AuthInner>
    </>
  );
}

const AuthInner = styled.div`
  width: 321px;
  margin: 0 auto;
`;

export default AuthTemplate;
