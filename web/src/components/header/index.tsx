import { mediaSize } from "lib/styles/media";
import { palette } from "lib/styles/palette";
import React from "react";
import Logo from "components/common/Logo";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import RemindInfoButton from "./RemindInfoButton";

function Header() {
  return (
    <HeaderBlock>
      <HeaderInner>
        <Logo />

        <HeaderRightBox>
          <SearchBar />
          <RemindInfoButton />
        </HeaderRightBox>
      </HeaderInner>
    </HeaderBlock>
  );
}

const HeaderBlock = styled.header`
  width: 100%;
  border-bottom: 1px solid ${palette.grayLight};
`;

const HeaderInner = styled.div`
  width: ${mediaSize.desktop}px;
  height: 48px;
  margin: 0 auto;
  color: ${palette.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderRightBox = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;
