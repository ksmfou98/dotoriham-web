import SmallBlackText from "components/common/SmallBlackText";
import React from "react";
import styled from "styled-components";

function ProfileNicknameForm() {
  return (
    <div>
      <FormLabel width="297px" label="닉네임" />
    </div>
  );
}

const FormLabel = styled(SmallBlackText)`
  padding-top: 8px;
`;

export default ProfileNicknameForm;
