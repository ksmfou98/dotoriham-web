import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

function Reminder() {
  return <ReminderBlock>리마인더</ReminderBlock>;
}

const ReminderBlock = styled.div`
  font-size: 16px;
  margin-bottom: 16px;
  color: ${palette.grayDarkest};
`;

export default Reminder;
