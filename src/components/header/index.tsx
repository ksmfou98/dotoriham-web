import { mediaSize } from "lib/styles/media";
import { palette } from "lib/styles/palette";
import React from "react";
import Logo from "components/common/Logo";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import RemindInfoButton from "./RemindInfoButton";
import { Link } from "react-router-dom";
import Path from "routes/Path";
import { useSelector } from "react-redux";
import { userSelector } from "stores/user";

function Header() {
  const { image, accessToken } = useSelector(userSelector);

  return (
    <HeaderBlock>
      <HeaderInner>
        <Logo />
        {accessToken && (
          <HeaderRightBox>
            <SearchBar />
            <RemindInfoButton />
            <Link to={Path.MyPage}>
              <ProfileImg src={image} alt="프로필 이미지" />
            </Link>
          </HeaderRightBox>
        )}
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

const ProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

export default Header;
