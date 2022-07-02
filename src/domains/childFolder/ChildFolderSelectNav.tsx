import CheckBox from "components/CheckBox/CheckBox";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

interface Props {
  onToggleAllChildFolder: () => void;
  onDeleteChildFolders: () => void;
  isAllChecked: boolean;
  isCheckedChildFolder: boolean;
}

function ChildFolderSelectNav({
  isAllChecked,
  isCheckedChildFolder,
  onToggleAllChildFolder,
  onDeleteChildFolders,
}: Props) {
  return (
    <ChildFolderSelectNavBlock>
      <SelectBox>
        <SelectForm>
          <SelectText>선택</SelectText>
          <SelectButton
            variant="secondary"
            isChecked={isAllChecked}
            onClick={onToggleAllChildFolder}
          />
        </SelectForm>

        {isCheckedChildFolder && (
          <SelectOption>
            <Option onClick={onDeleteChildFolders}>삭제</Option>
          </SelectOption>
        )}
      </SelectBox>
    </ChildFolderSelectNavBlock>
  );
}

const ChildFolderSelectNavBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-bottom: 16px;
  font-size: 12px;
  color: ${palette.grayDarkest};
`;

const SelectBox = styled.div`
  display: flex;
`;

const SelectForm = styled.div`
  display: flex;
  align-items: center;
`;

const SelectText = styled.span`
  height: 17px;
  margin-right: 4px;
`;

const SelectButton = styled(CheckBox)`
  display: flex;
  align-items: center;
`;

const SelectOption = styled.div`
  display: flex;
  align-items: center;
`;

const Option = styled.div`
  height: 17px;
  margin-left: 16px;
  cursor: pointer;
`;

export default ChildFolderSelectNav;
