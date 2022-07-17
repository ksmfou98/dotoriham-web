import { CheckBox } from "components";
import styled from "styled-components";

function SearchDotoriSelect() {
  return (
    <Block>
      <SelectForm>
        <SelectText>선택</SelectText>
        <CheckBox isChecked variant="secondary" />
      </SelectForm>

      {/* {isActiveSelectBox && ( */}
      <SelectOption>
        <div className="option">이동</div>
        <div className="option">삭제</div>
      </SelectOption>
      {/* )} */}
    </Block>
  );
}

const Block = styled.div`
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

export default SearchDotoriSelect;
