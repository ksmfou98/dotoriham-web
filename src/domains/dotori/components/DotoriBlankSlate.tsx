import { SymbolGray96Icon } from "assets/icons";
import { palette } from "lib/styles/palette";
import { getBlankSlateText } from "domains/dotori/utils/dotori";
import React from "react";
import styled from "styled-components";
import { DotoriPathTypes } from "types/dotori";

function DotoriBlankSlate({ path }: { path: DotoriPathTypes }) {
  const text = getBlankSlateText(path);
  return (
    <BlankSlateStyled>
      <Inner>
        <Logo />
        <Text>{text}</Text>
      </Inner>
    </BlankSlateStyled>
  );
}

const BlankSlateStyled = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  width: 273px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled(SymbolGray96Icon)`
  margin-bottom: 16px;
`;

const Text = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: ${palette.grayDarker};
`;

export default DotoriBlankSlate;
