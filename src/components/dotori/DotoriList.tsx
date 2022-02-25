import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dotoriSelector } from "stores/dotori";
import styled from "styled-components";
import DotoriListItem from "./DotoriListItem";

function DotoriList() {
  const dotoris = useSelector(dotoriSelector);

  const [isActiveDotoriMenuId, setIsActiveDotoriMenuId] = useState<string>("");
  const onActiveDotoriMenu = (dotoriId: string) => {
    setIsActiveDotoriMenuId(dotoriId);
  };

  return (
    <DotoriListBlock>
      {dotoris.map((dotori) => (
        <DotoriListItem
          key={dotori.id}
          dotori={dotori}
          isActiveDotoriMenuId={isActiveDotoriMenuId}
          onActiveDotoriMenu={onActiveDotoriMenu}
        />
      ))}
    </DotoriListBlock>
  );
}

const DotoriListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default DotoriList;
