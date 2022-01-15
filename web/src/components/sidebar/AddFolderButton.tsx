import Button from "components/common/Button";
import React from "react";
import styled from "styled-components";

function AddFolderButton() {
  return (
    <AddFolderButtonStyled variant="secondary" width="100%" height="40px">
      보관함 추가
    </AddFolderButtonStyled>
  );
}

const AddFolderButtonStyled = styled(Button)`
  font-weight: 700;
`;

export default AddFolderButton;
