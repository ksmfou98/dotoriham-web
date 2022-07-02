import { DropDownIcon } from "assets/icons";
import SwitchButton from "components/Button/SwitchButton";
import React, { memo } from "react";
import styled from "styled-components";
import { FilterMenu } from "types/dotori";
import DotoriFilterMenu from "./DotoriFilterMenu";

interface DotoriFilterNavProps {
  onToggleRemind: () => void;
  isRemind: boolean;
  onToggleFilterMenu: () => void;
  isOpenFilterMenu: boolean;
  filterType: FilterMenu;
  onChangeFilterType: (filterType: FilterMenu) => void;
}

function DotoriFilterNav({
  isRemind,
  onToggleRemind,
  isOpenFilterMenu,
  onToggleFilterMenu,
  filterType,
  onChangeFilterType,
}: DotoriFilterNavProps) {
  return (
    <DotoriFilterNavBlock>
      <RemindToggleStyled>
        <RemindToggleText>리마인드 도토리</RemindToggleText>
        <SwitchButton isChecked={isRemind} onToggle={onToggleRemind} />
      </RemindToggleStyled>

      <FilterMenuButton onClick={onToggleFilterMenu}>
        <FilterMenuText>{filterType.text}</FilterMenuText>
        <DropDownIcon />
        {isOpenFilterMenu && (
          <DotoriFilterMenu
            filterType={filterType}
            onChangeFilterType={onChangeFilterType}
            isOpenFilterMenu={isOpenFilterMenu}
            onToggleFilterMenu={onToggleFilterMenu}
          />
        )}
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

export default memo(DotoriFilterNav);
