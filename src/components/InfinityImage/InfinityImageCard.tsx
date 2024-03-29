import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import * as allTypes from "./type";

const InfinityImageCard = ({ mapList }: { mapList: allTypes.mapInfo[] }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageList, setImageList] = useState<allTypes.mapInfo[]>([]);
  const [scrollBottomToggle, setScrollBottomToggle] = useState<
    boolean | undefined
  >(false);

  imageRef.current?.addEventListener("scroll", () => {
    //스크롤을 할 때마다 로그로 현재 스크롤의 위치가 찍혀나온다.
    if (
      imageRef.current &&
      imageRef.current?.scrollHeight - imageRef.current?.scrollTop ===
        imageRef.current?.clientHeight
    ) {
      setScrollBottomToggle(true);
    }
  });

  useEffect(() => {
    setImageList(mapList?.slice(0, 50));
  }, [mapList]);

  useEffect(() => {
    if (scrollBottomToggle && imageList.length > 49) {
      setImageList((prevImageList) => {
        const newImageList = [
          ...prevImageList,
          ...mapList.slice(prevImageList.length, prevImageList.length + 50),
        ];
        return newImageList;
      });
    }
  }, [scrollBottomToggle, mapList]);

  return (
    <ImageCardLayout ref={imageRef}>
      {imageList?.map((list) => {
        return list.image ? (
          <ImageCard key={list._id} src={list.image} />
        ) : null;
      })}
    </ImageCardLayout>
  );
};

const ImageCardLayout = styled.div`
  width: 960px;
  max-height: 660px;
  min-height: 300px;
  margin: auto;
  flex-wrap: wrap;
  overflow: scroll;
  overflow-x: hidden;
  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    width: 730px;
  }
  @media only screen and (max-width: 480px) {
    width: 350px;
    min-height: 350px;
  }
`;

const ImageCard = styled.img`
  max-width: 200px;
  height: 150px;
  border: "";
  border-radius: 2px;
  box-shadow: 0 0px 3px 0.5px gray;
  margin: 10px 15px 0 20px;
  cursor: pointer;
  @media only screen and (max-width: 480px) {
    width: 150px;
    height: 110px;
    font-size: 18px;
    margin: 10px 0px 0px 18px;
  }
`;

export default InfinityImageCard;
