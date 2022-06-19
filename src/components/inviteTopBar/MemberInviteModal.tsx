import ModalTemplate from "components/common/ModalTemplate";
import { getFolderShareTokenAPI } from "lib/api/folder";
import { palette } from "lib/styles/palette";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface Props {
  onToggleModal: () => void;
  isModal: boolean;
}

function MemberInviteModal({ isModal, onToggleModal }: Props) {
  const { folderId = "" } = useParams<"folderId">();

  useEffect(() => {
    const getToken = async () => {
      const { folderIdToken } = await getFolderShareTokenAPI(folderId);
      console.log(folderIdToken);
    };

    getToken();
  }, []);

  return (
    <ModalTemplate
      width={522}
      height={179}
      isModal={isModal}
      onToggleModal={onToggleModal}
    >
      <Inner>
        <Title>초대 링크</Title>
      </Inner>
    </ModalTemplate>
  );
}

const Inner = styled.div`
  padding: 16px 20px 20px 20px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  ${palette.grayDarkest};
  margin-bottom: 12px;
`;

const LinkBlock = styled.div``;



export default MemberInviteModal;
