// BottomBar.tsx
import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import HouseIcon from "../../../assets/HouseIcon.svg";
import SearchIcon from "../../../assets/SearchIcon.svg";
import CookieIcon from "../../../assets/CookieIcon.svg";
import UserIcon from "../../../assets/UserIcon.svg";

/* === 아이콘: mask로 칠하기 === */
const MaskIcon = styled.span<{ $src: string; $active?: boolean }>`
  width: 30px;
  height: 30px;
  display: inline-block;

  /* 채울 색 (active면 주황, 아니면 회색) */
  background-color: ${({ $active }) => ($active ? "#FB6767" : "gray")};

  /* WebKit & 표준 마스크 */
  -webkit-mask-image: url("${({ $src }) => $src}");
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;

  mask-image: url("${({ $src }) => $src}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
`;

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

interface IconButtonProps { $active?: boolean; }

const IconButton = styled.button<IconButtonProps>`
  background: ${({ $active }) => ($active ? "#FFE5E5" : "transparent")};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  transition: background 0.2s;
  &:active { filter: brightness(0.95); }
`;

export const BottomBar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // ✅ 경로 소문자로 통일해서 비교
  const path = pathname.toLowerCase();

  // 홈: "/", "/home"
  const isHomeActive = path === "/" || path === "/home";

  // 로컬 정보 관련 화면 전체를 활성 처리
  // ex) /localinfoshare, /localinfoform, /localinfoaddress ...
  const isLocalInfoRoute =
    path === "/localinfoshare" ||
    path.startsWith("/localinfo");

  // 마이페이지 묶음
  const isAccountActive = path === "/mypage" || path.startsWith("/mypage/");

  return (
    <BarContainer>
      {/* Home */}
      <IconButton
        $active={isHomeActive}
        onClick={() => navigate("/home")}
        aria-label="Home"
        aria-current={isHomeActive ? "page" : undefined}
      >
        <MaskIcon $src={HouseIcon} $active={isHomeActive} />
      </IconButton>

      {/* Search: 라우팅 필요 없으면 그대로, 필요하면 이동 연결 */}
      <IconButton
        $active={false}
        onClick={() => navigate("/localinfoshare")}
        aria-label="Search"
      >
        <MaskIcon $src={SearchIcon} $active={false} />
      </IconButton>

      {/* Local info (쿠키) */}
      <IconButton
        $active={isLocalInfoRoute}
        onClick={() => navigate("/localinfoshare")}
        aria-label="Local Info"
        aria-current={isLocalInfoRoute ? "page" : undefined}
      >
        <MaskIcon $src={CookieIcon} $active={isLocalInfoRoute} />
      </IconButton>

      {/* Account */}
      <IconButton
        $active={isAccountActive}
        onClick={() => navigate("/mypage")}
        aria-label="My Page"
        aria-current={isAccountActive ? "page" : undefined}
      >
        <MaskIcon $src={UserIcon} $active={isAccountActive} />
      </IconButton>
    </BarContainer>
  );
};

export default BottomBar;
