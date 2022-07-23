import { ArrowUp16Icon } from "assets/icons";
import DividerLine from "components/DividerLine/DividerLine";
import useToggle from "domains/@shared/hooks/useToggle";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import RemindList from "./RemindList";

function Reminder() {
  const [isOpenReminder, onToggleReminder] = useToggle(true);

  return (
    <ReminderBlock>
      <ReminderTitle>
        <ReminderTitleText>리마인드</ReminderTitleText>
        <ReminderToggleButton onClick={onToggleReminder}>
          <div className="text">{isOpenReminder ? "접기" : "펼치기"}</div>
          <ArrowIconBox isOpen={isOpenReminder}>
            <ArrowUp16Icon />
          </ArrowIconBox>
        </ReminderToggleButton>
      </ReminderTitle>

      {isOpenReminder && <RemindList />}
      <DividerLine color={palette.grayLightest} width="100%" />
    </ReminderBlock>
  );
}
const ReminderBlock = styled.div`
  margin-bottom: 20px;
`;

const ReminderTitle = styled.div`
  font-size: 16px;
  margin-bottom: 16px;
  height: 21px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ReminderTitleText = styled.span`
  color: ${palette.grayDarkest};
`;

const ReminderToggleButton = styled.button`
  color: ${palette.grayDarker};
  font-size: 12px;
  display: flex;
  align-items: center;
  height: 100%;
  .text {
    margin-right: 4px;
    height: 100%;
    line-height: 19px;
  }
`;

const ArrowIconBox = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => (isOpen ? "" : `transform: rotate(180deg);`)}
  transition: all ease .5s;
  display: flex;
  align-items: center;
`;

export default Reminder;
