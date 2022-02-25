import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import { FilterMenu } from "types/dotori";
import DotoriFilterNav from "./DotoriFilterNav";
import DotoriSelectNav from "./DotoriSelectNav";

interface DotoriNavProps {
  isRemind: boolean;
  onToggleRemind: () => void;
  isOpenFilterMenu: boolean;
  onToggleFilterMenu: () => void;
  filterType: FilterMenu;
  onChangeFilterType: (filterType: FilterMenu) => void;
}

function DotoriNav({
  isRemind,
  onToggleRemind,
  isOpenFilterMenu,
  onToggleFilterMenu,
  filterType,
  onChangeFilterType,
}: DotoriNavProps) {
  return (
    <DotoriNavBlock>
      <DotoriSelectNav />
      <DotoriFilterNav
        isRemind={isRemind}
        onToggleRemind={onToggleRemind}
        isOpenFilterMenu={isOpenFilterMenu}
        onToggleFilterMenu={onToggleFilterMenu}
        filterType={filterType}
        onChangeFilterType={onChangeFilterType}
      />
    </DotoriNavBlock>
  );
}

const DotoriNavBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-bottom: 28px;
  font-size: 12px;
  color: ${palette.grayDarkest};
`;

export default DotoriNav;
