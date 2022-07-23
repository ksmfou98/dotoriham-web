import React from "react";
import { palette } from "lib/styles/palette";
import styled from "styled-components";
import { breakpoints } from "lib/styles/media";
import { SymbolGray22Icon } from "assets/icons";
import { useToggle } from "domains/@shared/hooks";
import MakePeopleModal from "./MakePeopleModal";

function Footer() {
  const [makePeopleModal, onToggleMakePeopleModal] = useToggle();

  return (
    <FooterBlock>
      <FooterInner>
        <FooterLinkGroup>
          <Logo>
            <LogoIcon />
            <LogoText>도토리함</LogoText>
          </Logo>

          <FooterMenu>
            <FooterMenuItem
              href="https://vintage-pizza-6f7.notion.site/0a28c30e1c9d436c80b421a753e03508"
              target="_blank"
              rel="noopener noreferrer"
            >
              서비스 이용약관
            </FooterMenuItem>
            <VerticalLine />
            <FooterMenuItem
              href="https://vintage-pizza-6f7.notion.site/db9f11ee53ff4688b9bd870beb756b21"
              target="_blank"
              rel="noopener noreferrer"
            >
              개인정보 처리방침
            </FooterMenuItem>
            <VerticalLine />
            <FooterMenuItem
              href="https://docs.google.com/forms/d/e/1FAIpQLSdH_XcTaymnaLASko_tSYu_8FlupBoXYBJWejwrb63eZHKMqA/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              피드백
            </FooterMenuItem>
            <VerticalLine />
            <div
              style={{ cursor: "pointer" }}
              onClick={onToggleMakePeopleModal}
            >
              만든 사람들
            </div>
          </FooterMenu>
        </FooterLinkGroup>
        <CopyRightText>Copyright © Dotoriham All rights reserved</CopyRightText>
      </FooterInner>
      {makePeopleModal && (
        <MakePeopleModal
          isModal={makePeopleModal}
          onToggleModal={onToggleMakePeopleModal}
        />
      )}
    </FooterBlock>
  );
}

const FooterBlock = styled.footer`
  height: 57px;
  line-height: 1.42;
  font-size: 12px;
  border-top: 1px solid ${palette.grayLight};
`;

const FooterInner = styled.div`
  height: 100%;
  width: ${breakpoints.large}px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FooterLinkGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 170px;
  height: 22px;
  margin-right: 28px;
  display: flex;
`;

const LogoIcon = styled(SymbolGray22Icon)`
  margin-right: 0.225rem;
`;

const LogoText = styled.span`
  font-family: Cafe24Ssurround;
  font-size: 16px;
  color: ${palette.grayDarker};
  line-height: 26px;
  transform: skew(-0.1deg);
`;

const FooterMenu = styled.div`
  display: flex;
  color: ${palette.grayDarker};
`;

const FooterMenuItem = styled.a``;

const VerticalLine = styled.div`
  width: 1px;
  height: 17px;
  margin: 0 19px 0 20px;
  background-color: ${palette.gray};
`;

const CopyRightText = styled.span`
  font-family: "Roboto";
  color: ${palette.grayDark};
`;

export default Footer;
