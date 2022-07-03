import { People18Icon } from "assets/icons";
import { Button } from "components";
import React from "react";
import styled from "styled-components";

interface Props {
  onClick: () => void;
}

function MemberInviteButton({ onClick }: Props) {
  return (
    <InviteButton
      width="75px"
      height="28px"
      variant="primary"
      onClick={onClick}
    >
      <People18Icon />
      초대
    </InviteButton>
  );
}

const InviteButton = styled(Button)`
  font-size: 12px;
  margin-left: 24px;
  svg {
    margin-right: 4px;
  }
`;

export default MemberInviteButton;
