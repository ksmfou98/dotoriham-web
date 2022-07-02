import { palette } from "lib/styles/palette";
import styled, { css } from "styled-components";

interface Props {
  mb?: number;
  mt?: number;
  ml?: number;
  mr?: number;
}

export const ModalTitle = styled.div<Props>`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: ${palette.black};
  height: 23px;
  line-height: normal;
  ${({ mb, mt, ml, mr }) => css`
    margin-bottom: ${mb || 0}px;
    margin-top: ${mt || 0}px;
    margin-left: ${ml || 0}px;
    margin-right: ${mr || 0}px;
  `}
`;
