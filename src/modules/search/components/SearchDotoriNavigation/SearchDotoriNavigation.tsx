import { palette } from "lib/styles";
import styled from "styled-components";
import { SearchDotoriSelect } from "../SearchDotoriSelect";
import { SearchDotoriSort } from "../SearchDotoriSort";

function SearchDotoriNavigation() {
  return (
    <Container>
      <SearchDotoriSelect />
      <SearchDotoriSort />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-bottom: 28px;
  font-size: 12px;
  color: ${palette.grayDarkest};
`;

export default SearchDotoriNavigation;
