import { Back24Icon, Next24Icon } from "assets/icons";
import React from "react";
import styled, { css } from "styled-components";
import useRemindQuery from "./hooks/useRemindQuery";
import RemindListItem from "./RemindListItem";

function RemindList() {
  const { data } = useRemindQuery();

  if (!data) return null;

  return (
    <RemindListBlock>
      <BackButton isHidden={false}>
        <Back24Icon />
      </BackButton>

      <RemindListBox>
        <div className="box-inner">
          {data.remindBookmarkList.map((remind) => (
            <RemindListItem key={remind.id} remindData={remind} />
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
  z-index: 1;
  position: relative;
`;

const commonButtonStyled = css<{ isHidden: boolean }>`
  z-index: 100;
  position: absolute;
  top: 50%;
  margin: -16px 0px;
  cursor: pointer;
  ${({ isHidden }) => isHidden && "display: none"};
`;

const BackButton = styled.div`
  ${commonButtonStyled}
  left: 0px;
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
