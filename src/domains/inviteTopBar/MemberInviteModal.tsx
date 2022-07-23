import { Button } from "components";
import DividerLine from "components/DividerLine/DividerLine";
import Input from "components/Input/Input";
import ModalTemplate from "components/Modal/ModalTemplate";
import SwitchButton from "components/Button/SwitchButton";
import { useCopyUrl, useToast, useToggle } from "domains/@shared/hooks";
import { getFolderShareTokenAPI } from "lib/api/folder";
import { palette } from "lib/styles/palette";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface Props {
  onToggleModal: () => void;
  isModal: boolean;
}

function MemberInviteModal({ isModal, onToggleModal }: Props) {
  const { folderId = "" } = useParams<"folderId">();
  const [folderToken, setFolderToken] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEditToggle, onToggleEditToggle] = useToggle(false);

  const { onCopyUrl } = useCopyUrl();

  const { errorToast } = useToast();

  useEffect(() => {
    const getToken = async () => {
      const { folderIdToken } = await getFolderShareTokenAPI(folderId);
      setFolderToken(folderIdToken);
    };

    getToken();
  }, [folderId]);

  const inviteLink = useMemo(
    () => `${window.location.origin}/share/${folderToken}`,
    [folderToken]
  );

  const onCopyInviteLink = () => {
    onCopyUrl(inviteLink);
  };

  return (
    <ModalTemplate
      width={522}
      height={179}
      isModal={isModal}
      onToggleModal={onToggleModal}
    >
      <Inner>
        <Title>초대 링크</Title>

        <LinkBlock>
          <Input height="32px" width="404px" readOnly value={inviteLink} />
          <Button
            width="72px"
            height="32px"
            variant="primary"
            onClick={onCopyInviteLink}
          >
            복사
          </Button>
        </LinkBlock>

        <DividerLine width="100%" color={palette.grayLight} mt={12} mb={13} />

        <div>
          <ToggleOption>
            <span>편집 옵션</span>
            <SwitchButton
              isChecked={isEditToggle}
              onToggle={() => errorToast("편집 옵션은 아직 준비중이에요!")}
            />
          </ToggleOption>

          <DescriptionOption>
            로그인한 모든 회원이 공유 보관함을 편집할 수 있어요.
            <br />
            편집 허용 전에는 읽기만 가능해요.
          </DescriptionOption>
        </div>
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

const LinkBlock = styled.div`
  display: flex;
  align-items: center;
  input {
    margin-right: 6px;
  }
  button {
    font-size: 12px;
  }
`;

const ToggleOption = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
  line-height: 17px;
  color: ${palette.grayDarkest};
`;

const DescriptionOption = styled.div`
  font-size: 10px;
  line-height: 14px;
  color: ${palette.grayDark};
`;

export default MemberInviteModal;
