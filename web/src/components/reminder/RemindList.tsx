import { Back24Icon, Next24Icon } from "assets/icons";
import React from "react";
import styled, { css } from "styled-components";
import reminds from "./mock.json";
import RemindListItem from "./RemindListItem";

function RemindList() {
  return (
    <RemindListBlock>
      <BackButton isHidden={false}>
        <Back24Icon />
      </BackButton>

      <RemindListBox>
        <div className="box-inner">
          {reminds.reminds.map((remind) => (
            <RemindListItem key={remind.id} />
          ))}
        </div>
      </RemindListBox>

      <NextButton isHidden={false}>
        <Next24Icon />
      </NextButton>
    </RemindListBlock>
  );
}

const RemindListBlock = styled.div`
  display: flex;
  margin-bottom: 17px;
  position: relative;
`;

const commonButtonStyled = css<{ isHidden: boolean }>`
  width: 24px;
  height: 100%;
  z-index: 100;
  position: absolute;
  ${({ isHidden }) => isHidden && "display: none"};
`;

const BackButton = styled.div`
  ${commonButtonStyled}
  left: 0px;
  margin-right: 24px;
`;

const NextButton = styled.div`
  ${commonButtonStyled}
  right: 0px;
`;

const RemindListBox = styled.div`
  overflow: hidden;
  width: 100%;
  .box-inner {
    width: 100%;
    display: flex;
  }
`;

export default RemindList;
