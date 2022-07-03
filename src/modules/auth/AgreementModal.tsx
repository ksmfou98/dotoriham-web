import { Button } from "components";
import ModalTemplate from "components/Modal/ModalTemplate";
import { palette } from "lib/styles/palette";
import styled from "styled-components";
import {
  AGREEMENT_PRIVACY_POLICY,
  AGREEMENT_TERMS_AND_CONDITIONS,
} from "./constants";
import { AgreementEssentialType } from "./hooks/useAgreementForm";

interface Props {
  isModal: boolean;
  name: AgreementEssentialType;
  onToggleModal: (essentialName: AgreementEssentialType) => void;
  onEditEssentialState: (
    essentialName: AgreementEssentialType,
    value: boolean
  ) => void;
}

function AgreementModal({
  isModal,
  onToggleModal,
  name,
  onEditEssentialState,
}: Props) {
  const title =
    name === "termsAndConditions"
      ? "이용 약관 동의"
      : "개인정보 수집/이용 동의";

  const content =
    name === "termsAndConditions"
      ? AGREEMENT_TERMS_AND_CONDITIONS
      : AGREEMENT_PRIVACY_POLICY;

  const onClickAgree = (
    agreementName: AgreementEssentialType,
    value: boolean
  ) => {
    onEditEssentialState(agreementName, value);
    onToggleModal(agreementName);
  };

  return (
    <ModalTemplate
      width={471}
      height={814}
      isModal={isModal}
      onToggleModal={() => onToggleModal(name)}
    >
      <AgreementModalStyled>
        <AgreementTitle>{title}</AgreementTitle>
        <AgreementContent
          isScroll={name === "termsAndConditions"}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <AgreementButtonGroup>
          <Button
            variant="secondary"
            width="184px"
            height="40px"
            onClick={() => onClickAgree(name, false)}
          >
            동의 안함
          </Button>
          <Button
            variant="secondary"
            width="184px"
            height="40px"
            onClick={() => onClickAgree(name, true)}
          >
            동의
          </Button>
        </AgreementButtonGroup>
      </AgreementModalStyled>
    </ModalTemplate>
  );
}

const AgreementModalStyled = styled.div`
  padding: 36px 40px;
`;

const AgreementTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 16px;
  color: ${palette.black};
`;

const AgreementContent = styled.div<{ isScroll: boolean }>`
  height: 636px;
  font-size: 14px;
  margin-bottom: 24px;
  ${(props) => props.isScroll && "overflow-y: scroll;"}
`;

const AgreementButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default AgreementModal;
