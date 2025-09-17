import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import styled from '@emotion/styled';

const PageWrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 0;
`;

const DefaultLayout = () => {
  return (
    <>
      <PageWrapper>
        <Outlet />
      </PageWrapper>
      <Navbar />
    </>
  );
};

export default DefaultLayout;
