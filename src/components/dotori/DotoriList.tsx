import React from "react";
import { useSelector } from "react-redux";
import { dotoriSelector } from "stores/dotori";
import styled from "styled-components";
import DotoriListItem from "./DotoriListItem";

function DotoriList() {
  const dotoris = useSelector(dotoriSelector);

  return (
    <DotoriListBlock>
      {dotoris.map((dotori) => (
        <DotoriListItem key={dotori.id} dotori={dotori} />
      ))}
    </DotoriListBlock>
  );
}

const DotoriListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default DotoriList;
