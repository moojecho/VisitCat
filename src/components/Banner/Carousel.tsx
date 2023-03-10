import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import * as allTypes from "./type";

import { banner1, banner2, banner3, banner5 } from "../../static/index";

const Carousel = () => {
  const TOTAL_SLIDES: allTypes.TotalSlides = 2;
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideRef = useRef<HTMLInputElement>(null);

  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(currentSlide + 1);
      setTimeout(() => setCurrentSlide(0), 1000);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(currentSlide - 1);
      setTimeout(() => setCurrentSlide(TOTAL_SLIDES), 1000);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    if (slideRef.current)
      if (currentSlide === -1 || currentSlide === TOTAL_SLIDES + 1) {
        slideRef.current.style.transform = `translateX(-${currentSlide}00vw)`;
      } else {
        slideRef.current.style.transform = `translateX(-${currentSlide}00vw)`;
        if (currentSlide === -1) {
          slideRef.current.style.transform = `translateX(100vw)`;
        }
      }
  }, [currentSlide]);

  return (
    <CarouselLayout>
      <SlideLayout ref={slideRef}>
        <CarouselImage style={{ background: "orange" }} />
        <CarouselImage src={banner5} />
        <CarouselImage src={banner1} />
        <CarouselImage src={banner3} />
        {currentSlide > TOTAL_SLIDES ? <CarouselImage src={banner5} /> : null}
      </SlideLayout>
      <CarouselMoveButtonLayout>
        <CarouselLeftButton onClick={() => PrevSlide()}>
          {"<"}
        </CarouselLeftButton>
        <CarouselLeftButton>{"||"}</CarouselLeftButton>
        <CarouselRightButton onClick={() => NextSlide()}>
          {">"}
        </CarouselRightButton>
      </CarouselMoveButtonLayout>
    </CarouselLayout>
  );
};

const CarouselLayout = styled.div`
  width: 100vw;
  height: 36vh;
  display: flex;
  align-items: center;
  margin-top: 10px;
  position: relative;
`;

const SlideLayout = styled.div`
  display: flex;
  transition: all 0.5s ease-in-out;
`;

const CarouselImage = styled.img`
  // ???????????? 1??????????????? ?????? ?????? ????????? ????????? ?????? ??????????????? ?????? x??????
  translate: -100vw;
  width: 100vw;
  height: 35vh;
  background-color: green;
`;

const CarouselLeftButton = styled.button`
  width: 30px;
  height: 30px;
  margin: auto;
  color: gray;
  font-size: 15px;
  font-weight: bold;
  border: none;
  background-color: transparent;
  border-radius: 15px;
  cursor: pointer;
`;
const CarouselRightButton = styled.button`
  width: 30px;
  height: 30px;
  margin: auto;
  color: gray;
  font-size: 15px;
  font-weight: bold;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const CarouselMoveButtonLayout = styled.div`
  width: 85px;
  height: 40px;
  right: 25%;
  bottom: 7%;
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 5;
`;

export default Carousel;
