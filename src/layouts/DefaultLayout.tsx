import { Outlet, useLocation } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <>
      <Outlet />
      {/* {showNavbar && <Navbar />} */}
    </>
  );
};

export default DefaultLayout;
