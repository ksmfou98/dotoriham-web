import { useEffect, useRef, useState } from "react";

interface SlideOptions {
  data: any[];
  slideItemWidth: number; // 슬라이드 될 아이템의 가로 길이
  slideCount: number; // 슬라이드 넘어가는 개수
}

export default function useSlider(options: SlideOptions) {
  const { data, slideItemWidth, slideCount } = options;

  const TOTAL_SLIDES_COUNT = data.length;
  const SHOW_SLIDES_COUNT = slideCount;

  const [currentSlide, setCurrentSlide] = useState(SHOW_SLIDES_COUNT);
  const slideRef = useRef<HTMLDivElement>(null);

  const onClickPrev = () => {
    setCurrentSlide(currentSlide - SHOW_SLIDES_COUNT);
  };

  const onClickNext = () => {
    setCurrentSlide(currentSlide + SHOW_SLIDES_COUNT);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${
        slideItemWidth * (currentSlide - SHOW_SLIDES_COUNT)
      }px)`;
    }
  }, [SHOW_SLIDES_COUNT, currentSlide, slideItemWidth]);

  return {
    currentSlide,
    slideRef,
    onClickNext,
    onClickPrev,
    TOTAL_SLIDES_COUNT,
    SHOW_SLIDES_COUNT,
  }; // button들 isShow 구현하고 이쪽 작성 예정
}
