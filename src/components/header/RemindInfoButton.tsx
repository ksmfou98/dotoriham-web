import { Bell24Icon } from "assets/icons";
import { useToggle } from "hooks";
import React from "react";
import styled from "styled-components";
import RemindAlarmMenu from "./RemindAlarmMenu";

function RemindInfoButton() {
  const [isRemindAlarmMenu, onToggleRemindAlarmMenu] = useToggle();

  return (
    <Container>
      <RemindInfoButtonStyled onClick={onToggleRemindAlarmMenu}>
        <Bell24Icon />
      </RemindInfoButtonStyled>
      {isRemindAlarmMenu && (
        <RemindAlarmMenu
          isOpen={isRemindAlarmMenu}
          onToggle={onToggleRemindAlarmMenu}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const RemindInfoButtonStyled = styled.div`
  margin-right: 14px;
  cursor: pointer;
`;

export default RemindInfoButton;
