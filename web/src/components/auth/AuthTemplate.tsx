import React from "react";
import styled from "styled-components";
import { AuthType } from "types/auth";
import AuthTitle from "./AuthTitle";

interface AuthTemplateProps {
  children: React.ReactNode;
  AuthType: AuthType;
}

function AuthTemplate({ children, AuthType }: AuthTemplateProps) {
  return (
    <>
      <AuthTitle AuthType={AuthType} />
      <AuthInner>{children}</AuthInner>
    </>
  );
}

const AuthInner = styled.div`
  width: 321px;
  margin: 0 auto;
`;

export default AuthTemplate;
