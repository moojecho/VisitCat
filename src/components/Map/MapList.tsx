import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import * as allTypes from './type';

const MapList = () => {
  const example = useSelector((state: any) => state.catLoctionMap);

  const TOTAL_SLIDES: allTypes.TotalSlides = example.length;
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  //다음 슬라이드 버튼-------------------------------------------------------
  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES-4) {
      setTimeout(() => setCurrentSlide(0), 0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  //이전 슬라이드 버튼-------------------------------------------------------
  const PrevSlide = () => {
    if (currentSlide === 0) {
      setTimeout(() => setCurrentSlide(TOTAL_SLIDES-4), 0);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };


//카카오 맵 api-------------------------------------------------------------

  useEffect(() => {
    example.map((list: any) => {
      const container = document.getElementById(`${list.mapNum}`);
      const option = {
        center: new window.kakao.maps.LatLng(
          list.mapLocation1,
          list.mapLocation2
        ),
        level: 5,
      };
      const map = new window.kakao.maps.Map(container, option);

      // 주소로 좌표 변환----------------------------------------------------

      // const geocoder = new window.kakao.maps.services.Geocoder();
      // // 주소로 좌표를 검색합니다..
      // geocoder.addressSearch(`${list.mapLocationName}`, function (result:any, status:any) {

      //   // 정상적으로 검색이 완료됐으면
      //   if (status === window.kakao.maps.services.Status.OK) {

      //     var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

      //     // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      //     map.setCenter(coords);
      //   }
      // })

      // 마커--------------------------------------------------------------

      let markerPosition = new window.kakao.maps.LatLng(
        list.mapLocation1,
        list.mapLocation2
      );

      // 마커를 생성
      let marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커를 지도 위에 표시
      marker.setMap(map);
    });
  }, []);

  return (
    <MapListLayout>
      <CarouselLeftButton  onClick={PrevSlide}>{"<"}</CarouselLeftButton>
      <SlideLayout>
        <Slide currentSlide={currentSlide}>
        {example.map((list: any) => (
          <MapCard key={list.key}>
            <CatPosition id={list.mapNum} />
            <PositionInformation>{list.mapLocationName}</PositionInformation>
          </MapCard>
        ))}
        </Slide>
      </SlideLayout>
      <CarouselRightButton onClick={NextSlide}>{">"}</CarouselRightButton>
    </MapListLayout>
  );
};

const MapListLayout = styled.div`
  width: 960px;
  height: 32vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-direction: row;
  overflow: hidden;

  @media only screen and (max-width: 768px){
    width: 495px;
  }
  @media only screen and (max-width: 480px){
    width: 380px;
  }
`;

const SlideLayout = styled.div`
  overflow: hidden;
`;

const Slide = styled.div<allTypes.currentSlide>`
  display: flex;
  transition: all 0.7s ease-in-out;
  transform:${props=>`translateX(-${props.currentSlide*230}px)`};
  @media only screen and (max-width: 480px){
    transform:${props=>`translateX(-${props.currentSlide*167}px)`};
  }
`

const MapCard = styled.div`
  width: 180px;
  height: 30vh;
  background-color: #dbdbdb;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0px auto 45px;
  @media only screen and (min-width: 1200px){
    min-width: 180px;
  }
  @media only screen and (max-width: 480px){
    width: 140px;
    height: 230px;
    margin: 17px 0 0 31px;
  }
`;

const CatPosition = styled.div`
  width: 160px;
  height: 22vh;
  margin-bottom: 10px;
  @media only screen and (max-width: 480px){
    width: 120px;
  }
`;

const PositionInformation = styled.div`
  width: 160px;
  height: 5vh;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  white-space: pre-line;
  @media only screen and (max-width: 480px){
    width: 130px;
    height: 20px;
    font-weight: bold;
    font-size: 8px;
    margin: -5px 0 0 5px;
  }
`;

const CarouselLeftButton = styled.button`
  width: 20px;
  height: 60px;
  margin: auto -15px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #626262;
  font-size: 25px;
  font-weight: bold;
  border: 1px solid white;
  border-radius: 5px;
  background-color: dbdbdb;
  z-index: 5;
  cursor: pointer;
`;
const CarouselRightButton = styled.button`
  width: 20px;
  height: 60px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #626262;
  font-size: 25px;
  font-weight: bold;
  border: 1px solid white;
  border-radius: 5px;
  background-color: dbdbdb;
  cursor: pointer;
`;

export default MapList;
