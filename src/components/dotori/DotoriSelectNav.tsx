import CheckBox from "components/common/CheckBox";
import React from "react";
import styled from "styled-components";

function DotoriSelectNav() {
  return (
    <DotoriSelectNavBlock>
      <SelectForm>
        <SelectText>선택</SelectText>
        <CheckBox variant="secondary" isChecked />
      </SelectForm>

      <SelectOption>
        <div className="option">이동</div>
        <div className="option">삭제</div>
      </SelectOption>
    </DotoriSelectNavBlock>
  );
}

const DotoriSelectNavBlock = styled.div`
  display: flex;
`;

const SelectForm = styled.div`
  display: flex;
  align-items: center;
`;

const SelectText = styled.div`
  height: 16px;
  margin-right: 4px;
`;

const SelectOption = styled.div`
  display: flex;
  align-items: center;
  .option {
    height: 16px;
    margin-left: 16px;
    cursor: pointer;
  }
`;

export default DotoriSelectNav;
