import styled, { keyframes } from 'styled-components';

// 슬라이드 업 애니메이션
export const slideUp = keyframes`
  from {
    transform: translateX(-50%) translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
`;

// 페이드 인 애니메이션
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 하단에서 슬라이드 인 애니메이션
export const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

// 스케일 인 애니메이션
export const scaleIn = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// 바운스 애니메이션
export const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0,-30px,0);
  }
  70% {
    transform: translate3d(0,-15px,0);
  }
  90% {
    transform: translate3d(0,-4px,0);
  }
`;

// 애니메이션을 적용하는 컴포넌트들
export const AnimatedContainer = styled.div<{ $animation: string; $duration?: string }>`
  animation: ${props => props.$animation} ${props => props.$duration || '0.3s'} ease-out;
`;

export const SlideUpContainer = styled.div`
  animation: ${slideUp} 0.3s ease-out;
`;

export const FadeInContainer = styled.div`
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ScaleInContainer = styled.div`
  animation: ${scaleIn} 0.3s ease-out;
`;

export const BounceContainer = styled.div`
  animation: ${bounce} 1s ease-out;
`;
