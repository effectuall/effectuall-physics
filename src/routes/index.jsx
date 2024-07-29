import React, { useState, useEffect } from 'react';
import file from '../assets/file.json';
import Hero from '../components/hero';
import WhyEffectuall from '../components/whyEffectuall';
import VirtualClass from '../components/virtualClass';
import Footer from '../components/footer';
import Testimonials from '../components/testimonials';

const Route = () => {
  const [files, setFiles] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  // console.log(file)
  useEffect(() => {
    setFiles(file);
  }, []);

  const getName = (file) => {
    const name = file.split('_');
    name.shift();
    return name.join(' ');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Hero/>
      <WhyEffectuall/>
      <VirtualClass/>
      <Testimonials/>
     <Footer/>
        
    </>
  );
};

export default Route; 