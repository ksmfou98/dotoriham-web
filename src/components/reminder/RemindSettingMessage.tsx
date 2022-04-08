import { BellUnSelectedIcon } from "assets/icons";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

function RemindSettingMessage() {
  return (
    <MessageStyled>
      <BellUnSelectedIcon />
      <span>리마인드를 설정해보세요!</span>
    </MessageStyled>
  );
}

const MessageStyled = styled.div`
  font-size: 12px;
  color: ${palette.grayDark};
  display: flex;
  align-items: center;
  margin-bottom: 17px;
  svg {
    margin-right: 8px;
  }
`;

export default RemindSettingMessage;
