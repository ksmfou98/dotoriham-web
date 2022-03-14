import CheckBox from "components/common/CheckBox";
import React from "react";
import styled from "styled-components";
import useDotoriSelect from "./hooks/useDotoriSelect";

function DotoriSelectNav() {
  const { isDotoriAllChecked, onToggleDotoriAllChecked, isActiveSelectBox } =
    useDotoriSelect();

  return (
    <DotoriSelectNavBlock>
      <SelectForm>
        <SelectText>선택</SelectText>
        <CheckBox
          variant="secondary"
          isChecked={isDotoriAllChecked}
          onClick={onToggleDotoriAllChecked}
        />
      </SelectForm>

      {isActiveSelectBox && (
        <SelectOption>
          <div className="option">이동</div>
          <div className="option">삭제</div>
        </SelectOption>
      )}
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
