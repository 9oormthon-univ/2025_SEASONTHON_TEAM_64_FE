import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from '../Splash';
import MainPage from '../MainPage';

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/MainPage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
