import React from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import ShopifyWork from './sections/ShopifyWork';
import DesignSection from './sections/DesignSection';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 selection:bg-blue-500/30">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <ShopifyWork />
        <DesignSection />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
