import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

type Toast = {
  id: number;
  message: string;
  type?: 'error' | 'info';
  isNavBar?: boolean;
};

const ToastContainer = styled.div<{ isNavBar?: boolean }>`
  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: calc(100% - 4rem);
  max-width: calc(550px - 4rem);

  left: 50%;
  bottom: ${({ isNavBar }) => (isNavBar ? '9rem' : '2.4rem')};

  transform: translateX(-50%);
  z-index: 9999;
`;

const slideUp = keyframes`
  from {
    transform: translateY(12px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ToastBox = styled.div<{ t?: 'error' | 'info'; delay?: number }>`
  display: flex;
  justify-content: center;

  width: 100%;
  padding: 1.4rem 0rem;

  ${({ theme }) => theme.fonts.bold}
  color: white;
  background: ${(p) => (p.t === 'error' ? '#e74c3c' : '#000')};

  transform: translateY(12px);
  animation: ${slideUp} 280ms ease-out forwards;
  animation-delay: ${({ delay }) => (delay ? `${delay}ms` : '0ms')};
`;

const ToastContext = createContext<{
  show: (message: string, type?: 'error' | 'info', isNavBar?: boolean) => void;
} | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const show = (
    message: string,
    type: 'error' | 'info' = 'info',
    isNavBar?: boolean,
  ) => {
    const navPresent =
      typeof isNavBar === 'boolean'
        ? isNavBar
        : !!document.querySelector('[data-navbar="true"]');

    const id = Date.now();
    setToasts((t) => [...t, { id, message, type, isNavBar: navPresent }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3500);
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <ToastContainer isNavBar={toasts.some((x) => x.isNavBar)}>
        {toasts.map((t) => (
          <ToastBox key={t.id} t={t.type}>
            {t.message}
          </ToastBox>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error('useToastContext must be used within ToastProvider');
  return ctx;
};

export default ToastProvider;
