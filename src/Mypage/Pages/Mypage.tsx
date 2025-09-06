// src/Mypage/Pages/Mypage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderRow from "../../Styles/Components/Layout/HeaderRow";
import { LogoButton } from "../../Styles/Components/Atoms/LogoButton";
import BellIcon from "../../Styles/Icons/BellIcon";
import BottomNavigation from "../../components/BottomNavigation";
import { MypageCharacterImg } from "../../Styles/Image/Imges";
import { PencilIcon } from "../../Styles/Icons/Pencilcon";

import {
  Wrapper,
  Container,
  Content,
  ProfileCard,
  AvatarBox,
  AvatarBadge,
  ProfileTexts,
  Nickname,
  Subnote,
  ActionsRow,
  ActionCard,
  ActionCaption,
  ActionTitle,
  ActionRight,
  InfoHeadRow,
  InfoPanel,
  InfoHeader,
  InfoBadge,
  InfoTitle,
  InfoDesc,
  PillButton,
} from "../Styles/Mypage.Styles";

import { ArrowRight } from "lucide-react";

/* 👇 추가: FCM 토큰 요청 + 서버 등록 함수 */
import { requestFcmToken } from "../../lib/firebase";        // 경로: src/firebase.ts
import { registerFcmToken } from "../../api/fcm";        // 경로: src/api/fcm.ts

/* memberId 가져오는 헬퍼 (로그인 시 저장해둔 값 사용) */
function getMemberId(): number | null {
  const raw =
    sessionStorage.getItem("memberId") || localStorage.getItem("memberId");
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : null;
}

const Mypage: React.FC = () => {
  const navigate = useNavigate();

  /* 👇 추가: 수동 등록 버튼 핸들러 */
  const handleManualFcmRegister = async () => {
    try {
      // 1) 알림 권한 확인/요청
      if (!("Notification" in window)) {
        alert("이 브라우저는 알림을 지원하지 않아요.");
        return;
      }
      if (Notification.permission === "default") {
        await Notification.requestPermission().catch(() => {});
      }
      if (Notification.permission !== "granted") {
        alert("알림 권한이 허용되지 않아 토큰을 발급할 수 없어요.");
        return;
      }

      // 2) FCM 토큰 발급
      const token = await requestFcmToken();
      console.log("[FCM] token from SDK:", token);
      if (!token) {
        alert("FCM 토큰을 가져오지 못했어요.");
        return;
      }

      // 3) memberId 확인
      const memberId = getMemberId();
      if (!memberId) {
        alert("memberId가 없습니다. 로그인 후 다시 시도해주세요.");
        return;
      }

      // 4) 서버 등록
      const msg = await registerFcmToken(memberId, token);
      console.log("[FCM] server register:", msg);
      alert(msg);
    } catch (e: any) {
      console.error("[FCM] register error:", e);
      alert(`등록 실패: ${e?.message || "알 수 없는 오류"}`);
    }
  };

  return (
    <Wrapper>
      <Container>
        {/* 상단바 */}
        <HeaderRow>
          <LogoButton>로고/아이콘</LogoButton>
          <BellIcon />
        </HeaderRow>

        {/* 내부 본문 */}
        <Content>
          {/* 프로필 카드 */}
          <ProfileCard>
            <AvatarBox>
              <MypageCharacterImg />
              <AvatarBadge>
                <PencilIcon />
              </AvatarBadge>
            </AvatarBox>

            <ProfileTexts>
              <Nickname>마루</Nickname>
              <Subnote>
                항상 좋은 일이 가득하길{"\n"}힙합 좋아하는 할머니입니다^^
              </Subnote>
            </ProfileTexts>
          </ProfileCard>

          {/* 오렌지 액션 카드 2개 */}
          <ActionsRow>
            <ActionCard onClick={() => {}}>
              <ActionCaption>내가 남긴 이야기, 다시 읽는 기록</ActionCaption>
              <ActionTitle>내가 쓴 글</ActionTitle>
              <ActionRight>
                <ArrowRight size={18} />
              </ActionRight>
            </ActionCard>

            <ActionCard onClick={() => navigate("/LocalInfoShare")}>
              <ActionCaption>
                누가 내 얘기 들었나? 따끈따끈 받은 추천!
              </ActionCaption>
              <ActionTitle>내가 공유한 정보</ActionTitle>
              <ActionRight>
                <ArrowRight size={18} />
              </ActionRight>
            </ActionCard>
          </ActionsRow>

          {/* 포춘쿠키 박스 */}
          <InfoPanel>
            <InfoHeader>
              <InfoBadge>동영상 전달예정</InfoBadge>
            </InfoHeader>

            <InfoHeadRow>
              <InfoTitle>포춘쿠키 모아보기</InfoTitle>
              <PillButton onClick={() => navigate("/CookieDetailPage")}>
                조회하기
              </PillButton>
            </InfoHeadRow>

            <InfoDesc>내가 모은 것들을 한번에 볼 수 있게!</InfoDesc>
          </InfoPanel>

          {/* 👇 추가: FCM 등록 테스트 버튼 (원하면 위치/스타일 변경 가능) */}
          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <PillButton onClick={handleManualFcmRegister}>
              FCM 등록 테스트
            </PillButton>
          </div>
        </Content>

        <BottomNavigation />
      </Container>
    </Wrapper>
  );
};

export default Mypage;
