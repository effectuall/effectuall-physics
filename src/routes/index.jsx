import React, { useState } from 'react';
import Hero from '../components/hero';
import WhyEffectuall from '../components/whyEffectuall';
import VirtualClass from '../components/virtualClass';
import Footer from '../components/footer';
import Testimonials from '../components/testimonials';
import Popup from '../components/popup';
import ContactForm from '../components/contactform';

const Route = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };
  return (
    <>
      <Hero/>
      <WhyEffectuall/>
      <VirtualClass/>
      <Testimonials/>
      <ContactForm/>
      <div>
      <div className="fixed bottom-5 right-5">
        <button onClick={toggleChatbot} className="bg-cyan-700 text-white p-3 rounded-full shadow-lg">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c5.522 0 10-4.477 10-10S17.522 2 12 2zm1 17v-2h-2v2h2zm1.07-7.75c-.13.11-1.19 1.05-1.64 1.5-.45.45-.51.82-.51 1.25H11v-1c0-.49.19-.91.61-1.39.39-.43 1.05-1.1 1.68-1.57.48-.36.71-.81.71-1.43 0-1.22-.97-2-2.14-2-1.13 0-1.86.61-2.06 1.39l-1.86-.71C9.3 7.14 10.55 6 12.34 6c2.09 0 3.66 1.48 3.66 3.4 0 .87-.37 1.57-1.07 2.1z" />
          </svg>
        </button>
      </div>
      {isChatbotOpen && <Popup/>}
    </div>
     <Footer/>
        
    </>
  );
};

export default Route; 