import { People18Icon } from "assets/icons";
import { Button } from "components/common";
import React from "react";
import styled from "styled-components";

interface Props {
  className?: string;
}

function MemberInviteButton({ className }: Props) {
  return (
    <InviteButton
      className={className}
      width="75px"
      height="28px"
      variant="primary"
    >
      <People18Icon />
      초대
    </InviteButton>
  );
}

const InviteButton = styled(Button)`
  font-size: 12px;
  svg {
    margin-right: 4px;
  }
`;

export default MemberInviteButton;
