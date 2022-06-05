import { ArrowSideIcon } from "assets/icons";
import CheckBox from "components/common/CheckBox";
import DividerLine from "components/common/DividerLine";
import { palette } from "lib/styles/palette";
import React, { memo } from "react";
import styled from "styled-components";
import AgreementModal from "./AgreementModal";
import useAgreementForm from "./hooks/useAgreementForm";

function AgreementForm() {
  const {
    AgreementList,
    isPrivacyPolicyModal,
    isTermsAndConditionsModal,
    onToggleModal,
    onEditEssentialState,
  } = useAgreementForm();

  return (
    <AgreementWrapper>
      {AgreementList.map(
        ({ isChecked, text, onClick, option, essentialName }, index) => (
          <React.Fragment key={text}>
            <AgreeListRow>
              <AgreeListItem>
                <CheckBox
                  type="button"
                  variant="secondary"
                  className="agree-checkbox"
                  isChecked={isChecked}
                  onClick={onClick}
                />
                {option && (
                  <AgreeOption isEssential={option === "필수"}>
                    [{option}]
                  </AgreeOption>
                )}
                <AgreeText>{text}</AgreeText>
              </AgreeListItem>
              {essentialName && (
                <AgreeItemButton
                  type="button"
                  onClick={() => onToggleModal(essentialName)}
                >
                  <ArrowSideIcon />
                </AgreeItemButton>
              )}
            </AgreeListRow>
            {index === 0 && <Divider width="100%" color={palette.grayLight} />}
          </React.Fragment>
        )
      )}

      {isTermsAndConditionsModal && (
        <AgreementModal
          name="termsAndConditions"
          isModal={isTermsAndConditionsModal}
          onToggleModal={onToggleModal}
          onEditEssentialState={onEditEssentialState}
        />
      )}

      {isPrivacyPolicyModal && (
        <AgreementModal
          name="privacyPolicy"
          isModal={isPrivacyPolicyModal}
          onToggleModal={onToggleModal}
          onEditEssentialState={onEditEssentialState}
        />
      )}
    </AgreementWrapper>
  );
}

const AgreementWrapper = styled.div`
  margin-top: 8px;
  .agree-checkbox {
    margin-right: 12px;
    display: flex;
    align-items: center;
  }
`;

const AgreeListRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  &:first-child {
    margin-bottom: 5px;
  }
`;

const AgreeListItem = styled.div`
  color: ${palette.grayDarkest};
  line-height: 1.42;
  height: 24px;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const AgreeItemButton = styled.button``;

const AgreeOption = styled.div<{ isEssential: boolean }>`
  font-weight: 500;
  margin-right: 8px;
  height: 24px;
  line-height: 21px;
  color: ${(props) => !props.isEssential && palette.grayDark};
`;

const AgreeText = styled.div`
  height: 24px;
  line-height: 21px;
`;

const Divider = styled(DividerLine)`
  margin-bottom: 12px;
`;

export default memo(AgreementForm);
