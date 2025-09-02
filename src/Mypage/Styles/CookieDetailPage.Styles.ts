import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 375px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 50px;
  overflow: hidden;
`;

export const StarWrap = styled.div`
  display: grid;
  place-items: center;
  margin: 8px 0 6px;
`;

export const CarouselArea = styled.div`
  position: relative;
  width: 100%;
  height: 260px;
  overflow: hidden;
  user-select: none;
  -webkit-user-drag: none;
`;

export const CarouselTrack = styled.div<{ $dragging: boolean }>`
  display: flex;
  width: 100%;
  transition: ${({ $dragging }) => ($dragging ? "none" : "transform 0.25s ease")};
  touch-action: pan-y;
`;

export const CardLayer = styled.div`
  position: relative;
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; /* 상위 영역에서만 터치 처리 */
`;

export const BgCard = styled.div<{ $offset: number }>`
  position: absolute;
  width: 260px;
  height: 150px;
  border-radius: 22px;
  background: #dfe5ee;
  opacity: 0.65;
  transform: translateX(${({ $offset }) => $offset}px);
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.08));
  z-index: 1;
`;

export const MainCard = styled.div`
  position: relative;
  width: 210px;
  min-height: 140px;
  border-radius: 22px;
  background: #aeb7c8;
  color: #243042;
  display: grid;
  place-items: center;
  padding: 16px 14px;
  text-align: center;
  line-height: 1.35;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1));
  z-index: 2;
  p {
    margin: 2px 0;
  }
`;

export const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin: 8px 0 14px;
`;

export const Dot = styled.span<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#6b7280" : "#d1d5db")};
`;
