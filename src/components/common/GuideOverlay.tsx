import React from 'react';
import styled from '@emotion/styled';

type GuideOverlayProps = {
  imageSrc: string;
  onClose: () => void;
};

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 1.6rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GuideOverlay: React.FC<GuideOverlayProps> = ({ imageSrc, onClose }) => {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <Backdrop onClick={onClose}>
      <Container onClick={onClose}>
        <Image src={imageSrc} alt="guide" />
      </Container>
    </Backdrop>
  );
};

export default GuideOverlay;
