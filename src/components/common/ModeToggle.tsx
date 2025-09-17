import React from 'react';
import styled from '@emotion/styled';

type Mode = 'OLD' | 'YOUNG';

type Props = {
  value: Mode;
  onChange: (next: Mode) => void;
  disabled?: boolean;
  loading?: boolean;
};

const ModeToggle: React.FC<Props> = ({
  value,
  onChange,
  disabled,
  loading,
}) => {
  const isOld = value === 'OLD';

  const handleClick = () => {
    if (disabled || loading) return;
    onChange(isOld ? 'YOUNG' : 'OLD');
  };

  return (
    <Wrap
      role="switch"
      aria-checked={isOld}
      aria-label="모드 토글"
      data-loading={!!loading}
      data-disabled={!!disabled}
      onClick={handleClick}
      $isOld={isOld}
    >
      <Label $isOld={isOld}>{isOld ? '노인' : '청년'}</Label>
      <Knob $isOld={isOld} />
    </Wrap>
  );
};

export default ModeToggle;

const Wrap = styled.button<{ $isOld: boolean }>`
  /* sizing via CSS variables for easier animation math */
  --w: 6.1rem;
  --h: 2.5rem;
  --gap: 0.3rem; /* side padding for knob */
  --knob: 1.9rem;

  position: relative;
  width: var(--w);
  height: var(--h);
  border-radius: 5rem;
  border: none;
  cursor: pointer;
  padding: 0 0.8rem;
  display: inline-flex;
  align-items: center;
  background: ${({ theme, $isOld }) =>
    $isOld ? theme.colors.primary.orange400 : theme.colors.basic.blue};
  transition: background 220ms ease;

  &[data-disabled='true'] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &[data-loading='true'] {
    opacity: 0.7;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Label = styled.span<{ $isOld: boolean }>`
  position: absolute;
  left: ${({ $isOld }) => ($isOld ? '0.9rem' : 'auto')};
  right: ${({ $isOld }) => ($isOld ? 'auto' : '0.9rem')};
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  z-index: 1;
  user-select: none;
`;

const Knob = styled.span<{ $isOld: boolean }>`
  position: absolute;
  width: var(--knob);
  height: var(--knob);
  left: var(--gap);
  top: calc((var(--h) - var(--knob)) / 2);
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transform: ${({ $isOld }) =>
    $isOld
      ? 'translateX(calc(var(--w) - var(--knob) - var(--gap) - var(--gap)))'
      : 'translateX(0)'};
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
