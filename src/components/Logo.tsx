import { LogoIcon } from "assets/icons";
import { palette } from "lib/styles/palette";
import React from "react";
import { useSelector } from "react-redux";
import Path from "routes/Path";
import { userSelector } from "stores/user";
import styled from "styled-components";

function Logo() {
  const { accessToken } = useSelector(userSelector);

  return (
    <LogoBlock href={accessToken ? Path.HomePage : Path.LandingPage}>
      <LogoIcon />
      <LogoText>도토리함</LogoText>
    </LogoBlock>
  );
}

const LogoBlock = styled.a`
  display: flex;
  align-items: center;
  height: 20px;
`;

const LogoText = styled.span`
  font-family: Cafe24Ssurround;
  color: ${palette.link0};
  font-size: 16px;
  margin-left: 3.5px;
  line-height: 23px;
  height: 20px;
  transform: skew(-0.1deg);
`;

export default Logo;
