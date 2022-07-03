import { useOutSideClick } from "hooks";
import { palette } from "lib/styles/palette";
import { scrollbar } from "lib/styles/utilStyles";
import { getLastTimeString } from "lib/utils/remind";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RemindAlarm } from "types/remind";
import useRemindAlarmQuery from "./hooks/useRemindAlarmQuery";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

function RemindAlarmMenu({ isOpen, onToggle }: Props) {
  const [remindAlarmList, setRemindAlarmList] = useState<RemindAlarm[]>([]);
  const { targetEl } = useOutSideClick(isOpen, onToggle);
  const { data } = useRemindAlarmQuery();

  useEffect(() => {
    if (!data) return;
    setRemindAlarmList(data.contents);
  }, [data]);

  return (
    <Container ref={targetEl}>
      {remindAlarmList.length === 0 ? (
        <EmptyListBox>
          <span>최근 3일간</span>
          <span>알림이 발송된 도토리가 없어요.</span>
        </EmptyListBox>
      ) : (
        remindAlarmList.map((remindAlarm) => (
          <RemindAlarmItem key={remindAlarm.id}>
            <TimeAlarmBox>
              <TimeAlarmMessage>리마인드 알림이 도착했어요.</TimeAlarmMessage>
              <TimeAlarmMessage>
                {getLastTimeString(remindAlarm.pushTime)}
              </TimeAlarmMessage>
            </TimeAlarmBox>
            <RemindBookmarkTitle>{remindAlarm.title}</RemindBookmarkTitle>
          </RemindAlarmItem>
        ))
      )}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  width: 264px;
  height: 295px;
  background: ${palette.white};
  top: 35px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 6px;
  box-shadow: 0 1px 4px 0 ${palette.shadow0};
  border: 1px solid ${palette.grayLightest};
  overflow: scroll;
  ${scrollbar};
`;

const EmptyListBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 12px;
    line-height: 1.42;
    text-align: center;
    color: ${palette.grayDark};
  }
`;

const RemindAlarmItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 59px;
  border-bottom: 1px solid ${palette.grayLightest};
`;

const TimeAlarmBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 12px 4px;
`;

const TimeAlarmMessage = styled.span`
  font-size: 10px;
  font-weight: normal;
  color: ${palette.grayDark};
`;

const RemindBookmarkTitle = styled.span`
  height: 17px;
  flex-grow: 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.42;
  margin-left: 12px;
  margin-bottom: 12px;
`;

export default RemindAlarmMenu;
