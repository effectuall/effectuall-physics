// src/routes/IframePage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import files from '../assets/file.json';

function webPage() {
  const { url } = useParams();  // Get the URL parameter from the route

  const OpenVisual = (A) => {
    return (
      `https://effectuall.github.io/Simulations/${A}.html`
    )
  }

  return (
    <div className="container mx-auto p-4">

      <iframe
        src={OpenVisual(url.slice(1))}
        title="Webpage Viewer"
        className="w-full h-[650px] md:h-[750px] border-none"
        loading="lazy"
      />
      <div className="md:block flex justify-center md:mt-3">
        <a href="/simulations"><button className="bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 mt-4">Simulations</button></a>
      </div>
    </div>
  );
}

export default webPage;
