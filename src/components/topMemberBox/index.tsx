import React from "react";
import styled from "styled-components";
import MemberInviteButton from "./MemberInviteButton";
import MemberListButton from "./MemberListButton";

function TopMemberBox() {
  return (
    <Container>
      <MemberListButton />
      <MemberInviteButton className="invite-btn" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  .invite-btn {
    margin-left: 24px;
  }
`;

export default TopMemberBox;
