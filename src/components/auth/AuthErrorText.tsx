import { palette } from "lib/styles/palette";
import styled from "styled-components";

export const AuthErrorText = styled.p`
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: 0;
  line-height: 1.42;
  padding-left: 2px;
  color: ${palette.error};
`;
