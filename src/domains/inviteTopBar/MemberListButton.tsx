import React from "react";
import styled from "styled-components";
import useFolderBelongMemberListQuery from "./hooks/useFolderBelongMemberListQuery";

function MemberListButton() {
  const { data } = useFolderBelongMemberListQuery();

  if (!data || !data.list.length) return null;

  return (
    <>
      <ProfileImage src={data.list[0].profileImage} alt="profileImage" />
    </>
  );
}

const ProfileImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

export default MemberListButton;
