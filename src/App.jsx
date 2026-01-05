import React from 'react';
import HomePage from './pages/homePage';
import AboutPage from './pages/aboutPage';
import ServicesPage from './pages/servicesPage';
import HowPage from './pages/howPage';
import Footer from './components/Footer';
import Location from './components/Location';
import Testimonials from './components/Testimonials';
import IconLoop from './components/LoopUsage'; 
import CreditorLoop from './components/CreditorLoop'; 

function App() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section id="home">
        <HomePage />
      </section>

      {/* 2. IDENTITY & SOCIAL PROOF */}
      <section id="about">
        <AboutPage />
      </section>
      
      <IconLoop />

      {/* 3. CORE SOLUTIONS */}
      <section id="services">
        <ServicesPage />
      </section>

      {/* 4. THE PROCESS & NETWORK */}
      <section id="how">
        <HowPage />
      </section>

      <CreditorLoop />

      {/* 5. VALIDATION */}
      <section id="reviews">
        <Testimonials />
      </section>

      {/* 6. PHYSICAL PRESENCE */}
      <section>
        <Location />
      </section>

      {/* 7. CONVERSION & LINKS */}
      <section id="contacts">
        <Footer />
      </section>
    </>
  );
}

export default App;