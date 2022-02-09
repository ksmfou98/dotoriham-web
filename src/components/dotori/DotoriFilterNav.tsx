import { DropDownIcon } from "assets/icons";
import SwitchButton from "components/common/SwitchButton";
import React from "react";
import styled from "styled-components";

function DotoriFilterNav() {
  return (
    <DotoriFilterNavBlock>
      <RemindToggleStyled>
        <RemindToggleText>리마인드 도토리</RemindToggleText>
        <SwitchButton isToggled={true} />
      </RemindToggleStyled>

      <FilterMenuButton>
        <FilterMenuText>최신순</FilterMenuText>
        <DropDownIcon />
      </FilterMenuButton>
    </DotoriFilterNavBlock>
  );
}

const DotoriFilterNavBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 277px;
`;

const RemindToggleStyled = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const RemindToggleText = styled.span`
  margin-right: 12px;
`;

const FilterMenuButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const FilterMenuText = styled.span``;

export default DotoriFilterNav;
