import Button from "components/common/Button";
import React from "react";
import styled from "styled-components";

function AddFolderButton() {
  return (
    <AddFolderButtonStyled
      variant="primary"
      label="폴더 추가"
      width="100%"
      height="40px"
    />
  );
}

const AddFolderButtonStyled = styled(Button)`
  font-weight: 700;
`;

export default AddFolderButton;
