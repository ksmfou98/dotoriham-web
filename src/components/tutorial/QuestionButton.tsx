import useToggle from "hooks/useToggle";
import React from "react";
import { useSelector } from "react-redux";
import { tutorialSelector } from "stores/tutorial";
import styled from "styled-components";

function QuestionButton() {
  const { isAlarm, isGuide } = useSelector(tutorialSelector);
  const [isTutorialModal, setIsTutorialModal] = useToggle();

  return <QuestionButtonStyled>QuestionButton</QuestionButtonStyled>;
}

const QuestionButtonStyled = styled.button`
  margin-top: 80px;
  position: relative;
`;

export default QuestionButton;
