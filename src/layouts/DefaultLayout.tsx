import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const DefaultLayout = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};

export default DefaultLayout;
