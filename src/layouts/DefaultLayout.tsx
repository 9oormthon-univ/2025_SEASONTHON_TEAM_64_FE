import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import styled from '@emotion/styled';
import { hasToken } from '../utils/authState';
import FcmRegistrar from '../utils/FcmRegistrar';

const PageWrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 0;
`;

const DefaultLayout = () => {
  const authed = hasToken();
  return (
    <>
      {authed && <FcmRegistrar />}
      <PageWrapper>
        <Outlet />
      </PageWrapper>
      <Navbar />
    </>
  );
};

export default DefaultLayout;
