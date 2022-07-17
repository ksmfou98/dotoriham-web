import { DropDownIcon } from "assets/icons";
import { useToggle } from "modules/@shared/hooks";
import { getSortText } from "modules/@shared/utils";
import { useSearchQueryParams } from "modules/search/hooks";
import styled from "styled-components";
import { SearchDotoriSortMenu } from "../SearchDotoriSortMenu";

function SearchDotoriSort() {
  const [isOpenSortMenu, onToggleSortMenu] = useToggle(false);
  const { sort } = useSearchQueryParams();
  const isActiveSortText = getSortText(sort);

  return (
    <Block>
      <RemindToggleStyled>
        <RemindToggleText>리마인드 도토리</RemindToggleText>
        {/* <SwitchButton isChecked onToggle={onToggleRemind} /> */}
      </RemindToggleStyled>

      <FilterMenuButton onClick={onToggleSortMenu}>
        <FilterMenuText>{isActiveSortText}</FilterMenuText>
        <DropDownIcon />
        {isOpenSortMenu && (
          <SearchDotoriSortMenu
            isOpenSortMenu={isOpenSortMenu}
            onToggleSortMenu={onToggleSortMenu}
            isActiveSortText={isActiveSortText}
          />
        )}
      </FilterMenuButton>
    </Block>
  );
}

const Block = styled.div`
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

export default SearchDotoriSort;
