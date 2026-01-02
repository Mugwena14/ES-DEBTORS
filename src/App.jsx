import React from 'react';
import HomePage from './pages/homePage';
import AboutPage from './pages/aboutPage';
import ServicesPage from './pages/servicesPage';
import HowPage from './pages/howPage';
import Footer from './components/Footer'
import Location from './components/Location'
import Testimonials from './components/Testimonials'

function App() {
  return (
    <>
      <section id="home">
        <HomePage />
      </section>

      <section id="about">
        <AboutPage />
      </section>

      <section id="services">
        <ServicesPage />
      </section>

      <section id="how">
        <HowPage />
      </section>

      <section id="reviews">
        <Testimonials />
      </section>

      <section>
        <Location />
      </section>

      <section id="contacts">
        <Footer />
      </section>
    </>
  );
}

export default App;