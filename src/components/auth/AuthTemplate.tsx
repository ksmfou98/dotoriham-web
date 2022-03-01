import React from "react";
import styled from "styled-components";
import { AuthType } from "types/auth";
import AuthDivider from "./AuthDivider";
import AuthTitle from "./AuthTitle";
import GoogleLoginButton from "./GoogleLoginButton";

interface AuthTemplateProps {
  children: React.ReactNode;
  AuthType: AuthType;
}

function AuthTemplate({ children, AuthType }: AuthTemplateProps) {
  return (
    <>
      <AuthTitle AuthType={AuthType} />
      <AuthInner>
        <GoogleLoginButton />
        {/* <AuthDivider />
        {children} */}
      </AuthInner>
    </>
  );
}

const AuthInner = styled.div`
  width: 321px;
  margin: 0 auto;
`;

export default AuthTemplate;
