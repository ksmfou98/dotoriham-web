import React from "react";
import useSlider from "domains/@shared/hooks/useSlider";
import styled, { css } from "styled-components";
import useRemindQuery from "./hooks/useRemindQuery";
import RemindListItem from "./RemindListItem";
import RemindSettingMessage from "./RemindSettingMessage";
import { Back24IMG, Next24IMG } from "assets/images";

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
  if (data.remindBookmarkList.length === 0) return <RemindSettingMessage />;
  return (
    <RemindListBlock>
      <BackButton
        isShow={currentSlide !== SHOW_SLIDES_COUNT}
        onClick={onClickPrev}
      >
        <img src={Back24IMG} alt="뒤로가기" />
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
        <img src={Next24IMG} alt="다음으로" />
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
  padding-left: 2px;
  .box-inner {
    width: 100%;
    display: flex;
  }
`;

export default RemindList;
