import {
  Bell24Icon,
  HamburgerMobileIcon,
  Search24MobileIcon,
} from "assets/icons";
import { media, palette } from "lib/styles";
import { useSelector } from "react-redux";
import { mobileHeaderSelector } from "stores/mobileHeader";
import styled from "styled-components";

function MobileHeader() {
  const { leftMenu, isShowRightMenu, title } =
    useSelector(mobileHeaderSelector);

  return (
    <Container>
      <Inner>
        <LeftButton>
          <HamburgerMobileIcon />
        </LeftButton>
        <Title>{title}</Title>

        <RightButtons>
          <Search24MobileIcon />
          <Bell24Icon />
        </RightButtons>
      </Inner>
    </Container>
  );
}

const Container = styled.header`
  display: none;
  width: 100%;
  ${media.medium} {
    display: block;
  }
`;

const Inner = styled.div`
  height: 52px;
  display: flex;
  align-items: center;
`;

const LeftButton = styled.button`
  margin: 0 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  color: ${palette.grayDarkest};
  font-size: 14px;
  line-height: 1.5;
`;

const RightButtons = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  svg {
    margin-right: 16px;
  }
`;

export default MobileHeader;
