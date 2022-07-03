import { PlusIcon } from "assets/icons";
import Button from "components/Button/Button";
import useHandleFolder from "modules/sidebar/hooks/useCreateFolder";
import React from "react";
import styled from "styled-components";

function AddFolderButton() {
  const { onCreateFolder } = useHandleFolder();

  return (
    <AddFolderButtonStyled
      variant="secondary"
      width="100%"
      height="40px"
      onClick={() => onCreateFolder()}
    >
      <PlusIcon />
      보관함 추가
    </AddFolderButtonStyled>
  );
}

const AddFolderButtonStyled = styled(Button)`
  font-weight: 500;
  margin-bottom: 40px;
  svg {
    margin-right: 8px;
  }
`;

export default AddFolderButton;
