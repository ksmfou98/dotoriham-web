import React from "react";
import { QuestionActiveIcon, QuestionIcon } from "assets/icons";
import useToggle from "hooks/useToggle";
import { palette } from "lib/styles/palette";
import transitions from "lib/styles/transitions";
import { useSelector } from "react-redux";
import { tutorialSelector } from "stores/tutorial";
import styled, { css } from "styled-components";

function QuestionButton() {
  const { isAlarm, isGuide } = useSelector(tutorialSelector);
  const [isTutorialMenu, onToggleTutorialMenu] = useToggle();

  return (
    <QuestionButtonStyled onClick={onToggleTutorialMenu}>
      {isTutorialMenu ? (
        <>
          <TutorialMenuBox variant="secondary" top={-12} left={47}>
            알림이 안 와요!
          </TutorialMenuBox>
          <TutorialMenuBox variant="primary" top={-60} left={47}>
            도토리함 가이드
          </TutorialMenuBox>
          <QuestionActiveIcon />
        </>
      ) : (
        <QuestionIcon />
      )}
    </QuestionButtonStyled>
  );
}

const QuestionButtonStyled = styled.button`
  margin-top: 80px;
  position: relative;
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
