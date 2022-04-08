import { Bell24Icon } from "assets/icons";
import React from "react";
import styled from "styled-components";

function RemindInfoButton() {
  return (
    <RemindInfoButtonStyled>
      <Bell24Icon />
    </RemindInfoButtonStyled>
  );
}

const RemindInfoButtonStyled = styled.div`
  margin-right: 14px;
  cursor: pointer;
`;

export default RemindInfoButton;
