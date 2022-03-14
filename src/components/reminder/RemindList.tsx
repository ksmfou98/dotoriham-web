import { Back24Icon, Next24Icon } from "assets/icons";
import useSlider from "hooks/useSlider";
import React from "react";
import styled, { css } from "styled-components";
import useRemindQuery from "./hooks/useRemindQuery";
import RemindListItem from "./RemindListItem";

function RemindList() {
  const { data } = useRemindQuery();

  const sliderOptions = {
    data: data?.remindBookmarkList || [],
    slideItemWidth: 198,
    slideCount: 2,
  };
  const {
    SHOW_SLIDES_COUNT,
    TOTAL_SLIDES_COUNT,
    currentSlide,
    onClickNext,
    onClickPrev,
    slideRef,
  } = useSlider(sliderOptions);

  if (!data) return null;
  return (
    <RemindListBlock>
      <BackButton
        isShow={currentSlide !== SHOW_SLIDES_COUNT}
        onClick={onClickPrev}
      >
        <Back24Icon />
      </BackButton>

      <RemindListBox>
        <div className="box-inner" ref={slideRef}>
          {data.remindBookmarkList.map((remind) => (
            <RemindListItem key={remind.id} remindData={remind} />
          ))}
        </div>
      </RemindListBox>

      <NextButton
        isShow={TOTAL_SLIDES_COUNT - currentSlide > SHOW_SLIDES_COUNT}
        onClick={onClickNext}
      >
        <Next24Icon />
      </NextButton>
    </RemindListBlock>
  );
}

const RemindListBlock = styled.div`
  display: flex;
  margin-bottom: 17px;
  z-index: 1;
  position: relative;
`;

const commonButtonStyled = css<{ isShow: boolean }>`
  z-index: 100;
  position: absolute;
  top: 50%;
  margin: -16px 0px;
  cursor: pointer;
  ${({ isShow }) => !isShow && "display: none"};
`;

const BackButton = styled.div`
  ${commonButtonStyled}
  left: 0px;
`;

const NextButton = styled.div`
  ${commonButtonStyled}
  right: 0px;
`;

const RemindListBox = styled.div`
  overflow: hidden;
  width: 100%;
  .box-inner {
    width: 100%;
    display: flex;
  }
`;

export default RemindList;
