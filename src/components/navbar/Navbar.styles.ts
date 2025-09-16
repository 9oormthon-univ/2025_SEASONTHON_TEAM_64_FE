import styled from '@emotion/styled';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 500px;

  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  padding: 8px 0;
  z-index: 100;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavLabel = styled.span<{ $isActive?: boolean }>`
  ${({ theme }) => theme.fonts.medium};
  font-size: 12px;
  color: ${({ $isActive }) => ($isActive ? '#FB6767' : 'gray')};
`;

const NavIcon = styled.div<{ $src: string; $active?: boolean }>`
  width: 32px;
  height: 32px;
  background-image: url('${({ $src }) => $src}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transition: all 0.2s;
`;

export { NavContainer, NavItem, NavLabel, NavIcon };
