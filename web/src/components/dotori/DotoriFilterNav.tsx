import React from "react";
import styled from "styled-components";

function DotoriFilterNav() {
  return (
    <DotoriFilterNavBlock>
      <RemindToggleStyled>
        <RemindToggleText>리마인드 도토리</RemindToggleText>
      </RemindToggleStyled>

      <FilterMenuButton>ㄴㅇ</FilterMenuButton>
    </DotoriFilterNavBlock>
  );
}

const DotoriFilterNavBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 277px;
`;

const RemindToggleStyled = styled.div``;

const RemindToggleText = styled.span``;

const FilterMenuButton = styled.div``;

export default DotoriFilterNav;
