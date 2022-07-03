import React from "react";

import styled from "styled-components";
import { ShareFolderName } from "../ShareFolderName";
import { useShareDotoriListQuery } from "modules/share/services";
import { ShareDotoriList } from "../ShareDotoriList";

function ShareTemplate() {
  const { data } = useShareDotoriListQuery();

  if (!data) return null;

  return (
    <Wrapper>
      <ShareFolderName />
      <ShareDotoriList dotoris={data.content} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 40px;
`;

export default ShareTemplate;
