import DividerLine from "components/common/DividerLine";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

function AuthDivider() {
  return (
    <AuthDividerStyled>
      <DividerLine width="123px" color={palette.grayDark} />
      <DividerText>or</DividerText>
      <DividerLine width="123px" color={palette.grayDark} />
    </AuthDividerStyled>
  );
}

const AuthDividerStyled = styled.div`
  display: flex;
  align-items: center;
  margin: 28px 0;
`;

const DividerText = styled.span`
  width: 75px;
  height: 25px;
  font-size: 16px;
  text-align: center;
  line-height: 1.56;
  color: ${palette.grayDarker};
`;

export default AuthDivider;
