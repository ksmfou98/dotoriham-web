import React from "react";
import styled from "styled-components";
import { Symbol32Icon } from "assets/icons";
import { AuthType } from "types/auth";
import { palette } from "lib/styles/palette";

function AuthTitle({ AuthType }: { AuthType: AuthType }) {
  const title =
    AuthType === "login"
      ? "다시 찾아와주셔서 감사해요!"
      : "편리한 북마크 생활을 시작해 보세요!";
  return (
    <AuthTitleBlock>
      <TitleLogo />
      <TitleText>{title}</TitleText>
    </AuthTitleBlock>
  );
}

const AuthTitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
  margin-bottom: 28px;
`;

const TitleLogo = styled(Symbol32Icon)`
  margin-right: 13.3px;
`;

const TitleText = styled.span`
  font-size: 20px;
  color: ${palette.primary};
  font-weight: bold;
  font-family: Cafe24Ssurround;
`;

export default AuthTitle;
