import styled from "styled-components";
import { Dotori } from "types/dotori";
import { ShareDotoriListItem } from "../ShareDotoriListItem";

interface Props {
  dotoris: Dotori[];
}

function ShareDotoriList({ dotoris }: Props) {
  return (
    <Wrapper>
      {dotoris.map((dotori) => (
        <ShareDotoriListItem dotori={dotori} key={dotori.id} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 0 24px 40px 0;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
`;

export default ShareDotoriList;
