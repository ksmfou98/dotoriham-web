import { css } from "styled-components";
import { palette } from "./palette";

export const scrollbar = css`
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${palette.white};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${palette.grayLight};
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
`;

export const ellipsis = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
