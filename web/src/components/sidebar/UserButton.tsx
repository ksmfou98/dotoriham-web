import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

function UserButton() {
  return (
    <UserButtonStyled>
      <UserImage src="https://lh3.googleusercontent.com/a/AATXAJy6jltxS8Vjh9imZ5GO_S22eGWNrZq230lNgTc1wg=s96-c" />
      <UserName>이도현</UserName>
    </UserButtonStyled>
  );
}

const UserButtonStyled = styled.button`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${palette.primary};
  margin-right: 6px;
`;

const UserName = styled.span`
  font-size: 14px;
  color: ${palette.grayDarker};
`;

export default UserButton;
