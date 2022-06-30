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
  /**
   * margin-bottom
   */
  mb?: number;
  /**
   * margin-top
   */
  mt?: number;
}

function DividerLine({ color, width, mb, mt, ...rest }: DividerLineProps) {
  return (
    <DividerLineStyled color={color} width={width} mb={mb} mt={mt} {...rest} />
  );
}

const DividerLineStyled = styled.div<DividerLineProps>`
  width: ${({ width }) => width};
  height: 1px;
  background-color: ${({ color }) => color};
  ${({ mb }) => mb && `margin-bottom: ${mb}px`};
  ${({ mt }) => mt && `margin-top: ${mt}px`};
`;

export default DividerLine;
