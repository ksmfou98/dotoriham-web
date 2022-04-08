import ModalTemplate from "components/common/ModalTemplate";
import SmallGreenText from "components/common/SmallGreenText";
import { palette } from "lib/styles/palette";
import React, { useState } from "react";
import styled from "styled-components";
import TutorialCloseButton from "./TutorialCloseButton";
import TutorialContents from "./TutorialContents";
import TutorialSideButtons from "./TutorialSideButtons";

interface TutorialModalProps {
  isModal: boolean;
  onToggleModal: () => void;
  tutorialMenu: "remindAlarm" | "dotorihamGuide";
}

function TutorialModal({
  isModal,
  onToggleModal,
  tutorialMenu,
}: TutorialModalProps) {
  const {
    Step1Content,
    Step2Content,
    Step3Content,
    Step4Content,
    Step5Content,
    RemindStep1Content,
    RemindStep2Content,
    RemindStep3Content,
    RemindSetp4Content,
  } = TutorialContents;

  const guideTutorialSteps = [
    {
      label: "STEP 1",
      description: "아래 설치하기를 클릭하여, 확장 프로그램을 설치해주세요!",
      content: <Step1Content />,
    },
    {
      label: "STEP 2",
      description:
        "브라우저 상단에서 도토리함 아이콘의 핀 버튼을 눌러 고정해주세요!",
      content: <Step2Content />,
    },
    {
      label: "STEP 3",
      description:
        "저장하고 싶은 페이지가 생겼나요? <br /> <center><circle>1</circle> 도토리함 아이콘을 클릭하고 <circle>2</circle> 원하는 위치에 저장해요!</center>",
      content: <Step3Content />,
    },
    {
      label: "STEP 4",
      description:
        "보관함마다 맴버를 초대하여, 서로가 저장한 도토리를 공유할 수 있어요! <br /> <center>(상반기 내 오픈 예정)</center>",
      content: <Step4Content />,
    },
    {
      label: "STEP 5",
      description:
        "도토리함을 사용하기 위한 모든 준비가 완료되었습니다! <br /> 사용법이 궁금할 때는, 좌측 하단의 도움말 버튼을 클릭해주세요.",
      content: <Step5Content />,
    },
  ];

  const remindTutorialSteps = [
    {
      label: "STEP 1",
      description:
        "마이페이지 > 환경 설정에서 ‘리마인드 알람 받기’를 활성화시켜주세요.",
      content: <RemindStep1Content />,
    },
    {
      label: "STEP 2",
      description: "크롬 상단 더보기 > 설정에 접속해주세요.",
      content: <RemindStep2Content />,
    },
    {
      label: "STEP 3",
      description: "개인정보 및 보안 > 사이트 설정에 접속해주세요.",
      content: <RemindStep3Content />,
    },
    {
      label: "STEP 4",
      description: "dotoriham.com의 알림 권한을 ‘허용’으로 설정하면 끝!",
      content: <RemindSetp4Content />,
    },
  ];

  const tutorialList =
    tutorialMenu === "dotorihamGuide"
      ? guideTutorialSteps
      : remindTutorialSteps;

  const [currentStep, setCurrentStep] = useState(0);
  const { label, description, content } = tutorialList[currentStep];
  const stepLength = tutorialList.length - 1;

  const onNextStep = () => {
    if (currentStep + 1 <= stepLength) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onPrevStep = () => {
    if (currentStep - 1 >= 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width={714}
      height={471}
    >
      <ModalInnerStyled>
        <TutorialCloseButton
          visible={currentStep === stepLength}
          onClick={onToggleModal}
        />

        <TutorialTitle>도토리함, 어떻게 사용하나요?</TutorialTitle>

        <TutorialDescription>
          <StepLabel label={label} fontWeight="bold" />
          <StepDescription dangerouslySetInnerHTML={{ __html: description }} />
        </TutorialDescription>

        <TutorialContent>{content}</TutorialContent>

        <TutorialSideButtons
          onPrev={onPrevStep}
          onNext={onNextStep}
          currentStep={currentStep}
          stepLength={stepLength}
        />

        <TutorialOrder>
          {tutorialList.map((step, index) => (
            <StepCircle key={step.label} active={index === currentStep} />
          ))}
        </TutorialOrder>
      </ModalInnerStyled>
    </ModalTemplate>
  );
}

const ModalInnerStyled = styled.div`
  padding: 20px 20px 56px;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TutorialTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${palette.black};
  text-align: center;
  margin-bottom: 28px;
`;

const TutorialDescription = styled.div`
  font-size: 14px;
  color: ${palette.grayDarkest};
  display: flex;
  justify-content: center;
  center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  circle {
    display: inline-block;
    text-align: center;
    line-height: 18px;
    width: 15px;
    height: 15px;
    background-color: ${palette.grayDarkest};
    color: ${palette.white};
    border-radius: 50%;
    font-size: 12px;
    font-family: Cafe24Ssurround;
    margin-right: 4px;
    &:last-child {
      margin-left: 4px;
    }
  }
`;

const StepLabel = styled(SmallGreenText)`
  margin-right: 12px;
  height: 42px;
  display: inline-block;
`;

const StepDescription = styled.span`
  line-height: 1.5;
  text-align: left;
`;

const TutorialContent = styled.div`
  flex: 1 auto;
`;

const TutorialOrder = styled.div`
  position: absolute;
  bottom: 44px;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 92px;
  height: 12px;
  display: flex;
  justify-content: space-between;
`;

const StepCircle = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  background-color: ${({ active }) =>
    active ? palette.primary : palette.grayLightest};
  border-radius: 50%;
`;

export default TutorialModal;
