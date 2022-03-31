import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

interface SmallGreenTextProps {
  label: string;
  fontWeight?: string;
}

function SmallGreenText({ label, fontWeight, ...rest }: SmallGreenTextProps) {
  return (
    <SmallGreenLabelStyled fontWeight={fontWeight} {...rest}>
      {label}
    </SmallGreenLabelStyled>
  );
}

const SmallGreenLabelStyled = styled.label<{ fontWeight?: string }>`
  font-size: 14px;
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight};`}
  line-height: 1.5;
  color: ${palette.primary};
`;

export default SmallGreenText;
