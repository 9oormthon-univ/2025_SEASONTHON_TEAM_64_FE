import React, { useMemo, useRef, useState } from "react";//CookieDetailPage.tsx

import { useNavigate } from "react-router-dom";

import HeaderRow from "../../Styles/Components/Layout/HeaderRow";
import BackIcon from "../../Styles/Icons/BackIcon";
import { BackIconBox } from "../../Styles/Components/Atoms/BackIconBox";
import BellIcon from "../../Styles/Icons/BellIcon";
import { BottomBar } from "../../Styles/Components/Navigation/BottomBar";
import { StartIcon } from "../../Styles/Icons/StartIcon";

import {
  Wrapper,
  Container,
  StarWrap,
  CarouselArea,
  CarouselTrack,
  CardLayer,
  BgCard,
  MainCard,
  Dots,
  Dot,
} from "../Styles/CookieDetailPage.Styles";

/**
 * 스와이프 가능한 쿠키 상세 화면
 * - 좌/우 스와이프: 이전/다음 카드 이동
 * - 데이터 배열 길이만 늘리면 N장 지원
 */
const CookieDetailPage: React.FC = () => {
  const navigate = useNavigate();

  // 카드 데이터 (필요시 LocalStorage/서버 데이터로 교체)
  const cards = useMemo(
    () => [
      "자주 웃어라.\n웃는 것을 미루면,\n쌓이지 않고,\n더 사라지더라.",
      "오늘의 작은 친절이\n내일의 인연이 된다.",
      "걱정은 내일의 슬픔을\n덜어주지 못하고,\n오늘의 힘만 빼앗는다.",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const startXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
  const goTo = (i: number) => setIndex(clamp(i, 0, cards.length - 1));

  // 터치/마우스 공통 핸들러
  const onStart = (clientX: number) => {
    startXRef.current = clientX;
    isDraggingRef.current = true;
  };
  const onMove = (clientX: number) => {
    if (!isDraggingRef.current || startXRef.current === null) return;
    setDragX(clientX - startXRef.current);
  };
  const onEnd = () => {
    if (!isDraggingRef.current || startXRef.current === null) return;
    const dx = dragX;
    const threshold = 50;
    if (dx <= -threshold) goTo(index + 1);
    else if (dx >= threshold) goTo(index - 1);
    setDragX(0);
    isDraggingRef.current = false;
    startXRef.current = null;
  };

  return (
    <Wrapper>
      <Container>
        <HeaderRow>
          <BackIconBox onClick={() => navigate(-1)} aria-label="뒤로가기">
            <BackIcon />
          </BackIconBox>
          <BellIcon />
        </HeaderRow>

        <StarWrap>
          <StartIcon />
        </StarWrap>

        <CarouselArea
          onTouchStart={(e) => onStart(e.touches[0].clientX)}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
          onTouchEnd={onEnd}
          onMouseDown={(e) => {
            e.preventDefault();
            onStart(e.clientX);
          }}
          onMouseMove={(e) => isDraggingRef.current && onMove(e.clientX)}
          onMouseLeave={onEnd}
          onMouseUp={onEnd}
          aria-roledescription="carousel"
        >
          <CarouselTrack
            style={{ transform: `translateX(calc(${(-index * 100).toString()}% + ${dragX}px))` }}
            $dragging={isDraggingRef.current}
          >
            {cards.map((text, i) => (
              <CardLayer key={i}>
                <BgCard $offset={-18} />
                <BgCard $offset={18} />

                <MainCard>
                  {text.split("\n").map((line, li) => (
                    <p key={li}>{line}</p>
                  ))}
                </MainCard>
              </CardLayer>
            ))}
          </CarouselTrack>
        </CarouselArea>

        <Dots role="tablist" aria-label="슬라이드 인디케이터">
          {cards.map((_, i) => (
            <Dot key={i} $active={i === index} aria-selected={i === index} />
          ))}
        </Dots>

        <BottomBar />
      </Container>
    </Wrapper>
  );
};

export default CookieDetailPage;
