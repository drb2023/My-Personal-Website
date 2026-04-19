import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleCanvas from './components/ParticleCanvas';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import Downloads from './pages/Downloads';

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      <div className="particle-bg">
        <ParticleCanvas />
      </div>
      <div className="app-layout">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<main><Resume /></main>} />
          <Route path="/portfolio" element={<main><Portfolio /></main>} />
          <Route path="/downloads" element={<main><Downloads /></main>} />
        </Routes>
        {pathname !== '/' && <Footer />}
      </div>
    </>
  );
}
