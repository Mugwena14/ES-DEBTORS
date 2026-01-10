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

const LandingPage = () => (
  <>
    <section id="home"><HomePage /></section>
    <section id="about"><AboutPage /></section>
    <IconLoop />
    <section id="services"><ServicesPage /></section>
    <section id="how"><HowPage /></section>
    <CreditorLoop />
    <section id="reviews"><Testimonials /></section>
    <section><Location /></section>
    <section id="contacts"><Footer /></section>
  </>
);

export default LandingPage;