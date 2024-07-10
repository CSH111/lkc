import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";

const staticImgData = [
  { src: "dashboard.svg", alt: "dashboard_img" },
  { src: "card.svg", alt: "card_img" },
  { src: "graph.svg", alt: "graph_img" },
  { src: "profile.svg", alt: "profile_img" },
];

export default function Bottom() {
  return (
    <BottomStyles.Container>
      {staticImgData.map((imgData, idx) => {
        return (
          <BottomStyles.ImgBox
            key={imgData.src}
            className="img-box"
            $isActive={idx === 2}
            //todo 페이지추가 후 인디케이트 로직 업데이트
          >
            <Image src={imgData.src} width={25} height={25} alt={imgData.alt} />
            <div className="indicator" />
          </BottomStyles.ImgBox>
        );
      })}
    </BottomStyles.Container>
  );
}

const BottomStyles = {
  Container: styled.nav`
    /* position: fixed;
    height: 100px; */
    height: 50px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    /* padding: 10px; */
    padding-top: 15px;
    /* height: 70px; */
    /* bottom: 0;
    left: 0; */
    width: 100%;
  `,
  ImgBox: styled.div<{ $isActive: boolean }>`
    position: relative;
    padding-bottom: ${(p) => (p.$isActive ? "20px" : "0px")};

    .indicator {
      display: ${(p) => (p.$isActive ? "inital" : "none")};
      width: 100%;
      height: 5px;
      background-color: black;
      border-radius: 2.5px;
      position: absolute;
      bottom: 0;
    }
  `,
};
