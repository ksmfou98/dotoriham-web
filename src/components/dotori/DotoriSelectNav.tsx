import CheckBox from "components/common/CheckBox";
import React from "react";
import styled from "styled-components";
import { DotoriToggleModals } from "./DotoriTemplate";
import useDotoriSelect from "./hooks/useDotoriSelect";

interface DotoriSelectNavProps {
  onToggleModal: DotoriToggleModals;
  isTrashPage: boolean;
}

function DotoriSelectNav({ isTrashPage, onToggleModal }: DotoriSelectNavProps) {
  const {
    onToggleDeleteModal,
    onToggleMoveModal,
    onToggleRestoreModal,
    onToggleTruncateModal,
  } = onToggleModal;

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
          {isTrashPage ? (
            <>
              <div className="option" onClick={onToggleRestoreModal}>
                복원
              </div>
              <div className="option" onClick={onToggleTruncateModal}>
                삭제
              </div>
            </>
          ) : (
            <>
              <div className="option" onClick={onToggleMoveModal}>
                이동
              </div>
              <div className="option" onClick={onToggleDeleteModal}>
                삭제
              </div>
            </>
          )}
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
