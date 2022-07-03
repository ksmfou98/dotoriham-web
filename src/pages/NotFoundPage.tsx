import { SymbolGray96Icon } from "assets/icons";
import Button from "components/Button/Button";
import { palette } from "lib/styles/palette";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <NotFoundPageBlock>
      <NotFoundContent>
        <SymbolGray96Icon />
        <StrongText>404 : page not found</StrongText>
        <Text>페이지를 찾을 수 없어요!</Text>
      </NotFoundContent>
      <Button
        variant="primary"
        width="172px"
        height="40px"
        onClick={() => navigate("/")}
      >
        홈으로
      </Button>
    </NotFoundPageBlock>
  );
}

const NotFoundPageBlock = styled.div`
  width: 100%;
  margin-top: 273px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NotFoundContent = styled.div`
  width: 273px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 44px;
`;

const StrongText = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: ${palette.grayDarker};
  font-family: Roboto;
  margin: 16px 0;
`;

const Text = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: ${palette.grayDarker};
`;

export default NotFoundPage;
