import React from "react";
import styled from "styled-components";

interface SmallBlackTextProps {
  label: string;
  width?: string;
}

const SmallBlackTextStyled = styled.label<{ width?: string }>`
  font-size: 14px;
  line-height: 1.5;
  ${({ width }) => width && `width: ${width};`}
`;

function SmallBlackText({ label, width, ...rest }: SmallBlackTextProps) {
  return (
    <SmallBlackTextStyled width={width} {...rest}>
      {label}
    </SmallBlackTextStyled>
  );
}

export default SmallBlackText;
