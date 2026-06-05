import BackgroundEffects from './components/BackgroundEffects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureCards from './components/FeatureCards';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <BackgroundEffects />
      <Navbar />
      <main className="app-container">
        <div id="home" style={{ display: 'flex', flexDirection: 'column', gap: '60px', scrollMarginTop: '100px' }}>
          <Hero />
          <FeatureCards />
        </div>
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
