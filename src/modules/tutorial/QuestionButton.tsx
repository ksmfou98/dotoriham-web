import React from "react";
import { QuestionActiveIcon, QuestionIcon } from "assets/icons";
import useToggle from "hooks/useToggle";
import { palette } from "lib/styles/palette";
import transitions from "lib/styles/transitions";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleTutorialAlarm,
  toggleTutorialGuide,
  tutorialSelector,
} from "stores/tutorial";
import styled, { css } from "styled-components";
import { useOutSideClick } from "hooks";
import TutorialModal from "./TutorialModal";

function QuestionButton() {
  const { isAlarm, isGuide } = useSelector(tutorialSelector);
  const dispatch = useDispatch();
  const [isTutorialMenu, onToggleTutorialMenu] = useToggle();
  const { targetEl } = useOutSideClick(isTutorialMenu, onToggleTutorialMenu);

  const onToggleAlarmModal = () => dispatch(toggleTutorialAlarm({}));
  const onToggleGuideModal = () => dispatch(toggleTutorialGuide({}));

  return (
    <>
      <QuestionButtonStyled ref={targetEl} onClick={onToggleTutorialMenu}>
        {isTutorialMenu ? (
          <>
            <TutorialMenuBox
              variant="secondary"
              top={-12}
              left={47}
              onClick={onToggleAlarmModal}
            >
              알림이 안 와요!
            </TutorialMenuBox>
            <TutorialMenuBox
              variant="primary"
              top={-60}
              left={47}
              onClick={onToggleGuideModal}
            >
              도토리함 가이드
            </TutorialMenuBox>
            <QuestionActiveIcon />
          </>
        ) : (
          <QuestionIcon />
        )}
      </QuestionButtonStyled>
      {isAlarm && (
        <TutorialModal
          isModal={isAlarm}
          onToggleModal={onToggleAlarmModal}
          tutorialMenu="remindAlarm"
        />
      )}

      {isGuide && (
        <TutorialModal
          isModal={isGuide}
          onToggleModal={onToggleGuideModal}
          tutorialMenu="dotorihamGuide"
        />
      )}
    </>
  );
}

const QuestionButtonStyled = styled.div`
  margin-top: 80px;
  position: relative;
  cursor: pointer;
`;

interface TutorialMenuStyle {
  variant: "primary" | "secondary";
  top: number;
  left: number;
}

const TutorialMenuBox = styled.div<TutorialMenuStyle>`
  width: 118px;
  height: 42px;
  font-size: 14px;
  font-weight: bold;
  font-family: "Cafe24Ssurround";
  animation: ${transitions.fadeIn} 0.2s ease-in-out;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 8px 8px 0px;
  cursor: pointer;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  ${(props) =>
    props.variant === "primary"
      ? css`
          background-color: ${palette.primary};
          color: ${palette.white};
          border: none;
        `
      : css`
          background-color: ${palette.white};
          color: ${palette.primary};
          border: 1px solid ${palette.primary};
        `}
`;

export default QuestionButton;
