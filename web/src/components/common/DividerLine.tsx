import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

function DividerLine({ ...rest }) {
  return <DividerLineStyled {...rest} />;
}

const DividerLineStyled = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.border0};
`;

export default DividerLine;
