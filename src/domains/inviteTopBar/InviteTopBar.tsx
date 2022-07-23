import { useToggle } from "domains/@shared/hooks";
import React from "react";

import styled from "styled-components";
import MemberInviteButton from "./MemberInviteButton";
import MemberInviteModal from "./MemberInviteModal";
// import MemberListButton from "./MemberListButton";

function InviteTopBar() {
  const [isModal, onToggleModal] = useToggle(false);

  return (
    <>
      <Container>
        {/* <MemberListButton /> */}
        <MemberInviteButton onClick={onToggleModal} />
      </Container>
      {isModal && (
        <MemberInviteModal isModal={isModal} onToggleModal={onToggleModal} />
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default InviteTopBar;
