import React from "react"; //BottomBar.tsx
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { House, Star, Search, User } from "lucide-react";

/* 아이콘 styled-components */
const IconBase = `
  width: 30px;
  height: 30px;
  stroke: gray;
`;

const HouseIcon = styled(House)`${IconBase}`;
const StarIcon = styled(Star)`${IconBase}`;
const SearchIcon = styled(Search)`${IconBase}`;
const AccountIcon = styled(User)`${IconBase}`;

/* BottomBar 전체 컨테이너 */
const BarContainer = styled.div`
  background-color: white;
  border-radius: 50px;
  width: 375px;
  height: 80px;
  margin: auto 0 0 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
`;

/* 버튼 래퍼 */
interface IconButtonProps {
  $active?: boolean;
}

const IconButton = styled.button<IconButtonProps>`
  background: ${({ $active }) => ($active ? "#FB6767" : "transparent")};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  transition: background 0.2s;

  &:active svg {
    stroke: black; /* 눌렀을 때 아이콘 색 잠깐 바뀜 */
  }
`;

export const BottomBar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 현재 경로 기준으로 활성 여부 계산
  const isHomeActive = pathname === "/home" || pathname === "/"; // 필요 시 조정
  const isStarActive = pathname === "/LocalInfoShare";
  const isAccountActive = pathname === "/Mypage";
  // Search는 요구사항상 항상 비활성 배경

  return (
    <BarContainer>
      {/* Home */}
      <IconButton
        $active={isHomeActive}
        onClick={() => {
          // 필요 시 홈 라우트 지정
          // navigate("/home");
        }}
        aria-label="Home"
      >
        <HouseIcon />
      </IconButton>

      {/* Search: 배경색 없이 이동만 */}
      <IconButton
        $active={false}
        onClick={() => navigate("/LocalInfoShare")}
        aria-label="Search"
      >
        <SearchIcon />
      </IconButton>

      {/* Star: /LocalInfoShare에 있을 땐 활성 배경 유지 */}
      <IconButton
        $active={isStarActive}
        onClick={() => navigate("/LocalInfoShare")}
        aria-label="Favorites"
      >
        <StarIcon />
      </IconButton>

      {/* Account: /Mypage에 있을 땐 활성 배경 유지 */}
      <IconButton
        $active={isAccountActive}
        onClick={() => navigate("/Mypage")}
        aria-label="My Page"
      >
        <AccountIcon />
      </IconButton>
    </BarContainer>
  );
};

export default BottomBar;
