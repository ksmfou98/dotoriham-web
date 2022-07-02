import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

function LargeBlackText({ text }: { text: string }) {
  return <TextStyled>{text}</TextStyled>;
}

const TextStyled = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  color: ${palette.grayDarkest};
`;

export default LargeBlackText;
