import React from "react";
import styled from "styled-components";

interface DividerLineProps {
  /**
   * Divider 길이
   */
  width: string;
  /**
   * Divider 색상
   */
  color: string;
}

function DividerLine({ color, width, ...rest }: DividerLineProps) {
  return <DividerLineStyled color={color} width={width} {...rest} />;
}

const DividerLineStyled = styled.div<DividerLineProps>`
  width: ${({ width }) => width};
  height: 1px;
  background-color: ${({ color }) => color};
`;

export default DividerLine;
