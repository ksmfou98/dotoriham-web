import CheckBox from "components/CheckBox/CheckBox";
import React, { memo } from "react";
import styled from "styled-components";
import useDotoriSelect from "../hooks/useDotoriSelect";

interface DotoriSelectNavProps {
  isTrashPage: boolean;
  onToggleDeleteModal: () => void;
  onToggleMoveModal: () => void;
  onToggleTruncateModal: () => void;
  onToggleRestoreModal: () => void;
}

function DotoriSelectNav({
  isTrashPage,
  onToggleDeleteModal,
  onToggleMoveModal,
  onToggleRestoreModal,
  onToggleTruncateModal,
}: DotoriSelectNavProps) {
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

export default memo(DotoriSelectNav);
