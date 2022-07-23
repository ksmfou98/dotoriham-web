import { Symbol36Icon } from "assets/icons";
import { palette } from "lib/styles";
import styled, { css } from "styled-components";

interface Props {
  width?: number;
  height?: number;
}

function DotoriDefaultImage({ width, height }: Props) {
  return (
    <Container>
      <Image width={width} height={height} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${palette.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled(Symbol36Icon)<Props>`
  ${({ width = 37, height = 38 }) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`;

export default DotoriDefaultImage;
