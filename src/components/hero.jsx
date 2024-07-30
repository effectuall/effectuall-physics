// Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center bg-[#164F63] text-white p-8 ">
      <div className="md:w-1/2 md:pl-32 hidden md:block">
        <img src="/hero-image.png" alt="Hero" className="w-3/4 h-auto" />
      </div>
      <div className="md:w-1/2 p-4 md:p-8 text-center md:text-left">
        <h1 className="text-4xl font-bold mb-4 "> A fresh way to <span className="text-cyan-200">experience STEM </span></h1>
        <p className="text-white-100 mb-4">
         Empowers your learning & training goals with personalized insights and real-world interactive 3D modules.
        </p>
        <div className="flex justify-center md:justify-start gap-5">
        <a href='/dashboard'><button className="text-center lf:px-10 md:px-6 px-4 bg-[#ffffff00] hover:bg-[#ffffff] hover:text-black md:py-3 py-2 font-medium lg:text-lg  border-2 border-white rounded-3xl">
          Try Simulations
        </button></a>
        <a href="/about"><button className="w-full lg:px-10 md:px-6 hover:shadow px-4 md:py-3 py-2 font-medium lg:text-lg bg-white hover:bg-gray-200 rounded-3xl text-black">
          Learn More
        </button></a>
        </div>
     
      </div>
      
    </div>
    </>
  
  );
};

export default Hero;
