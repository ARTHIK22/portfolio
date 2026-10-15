// src/App.tsx
import React from 'react';
import { MotionProvider } from './context/MotionContext';
import { SpatialBackground } from './components/background/SpatialBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Skills } from './components/Skills';
import { Resume } from './components/Resume';
import { Certifications } from './components/Certifications';
import { GitHubSection } from './components/GitHubSection';
import { CodingProfiles } from './components/CodingProfiles';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#F8F7F2] text-[#263238] flex flex-col font-sans selection:bg-[#D6B574]/30 selection:text-[#263238]">
        {/* Layered Animated Spatial Background */}
        <SpatialBackground />

        {/* Floating Liquid Glass Navigation */}
        <Navbar />

        {/* Main Content Landmarks */}
        <main id="main-content" className="flex-1 relative z-10">
          <Hero />
          <About />
          <FeaturedProjects />
          <Skills />
          <Resume />
          <Certifications />
          <GitHubSection />
          <CodingProfiles />
          <Contact />
        </main>

        {/* Editorial Footer with Controls */}
        <Footer />
      </div>
    </MotionProvider>
  );
};

export default App;
