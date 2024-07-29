// src/routes/IframePage.js
import React from 'react';
import { useParams } from 'react-router-dom';

function webPage() {
  const { url } = useParams();  // Get the URL parameter from the route
    console.log(url.slice(1))
    const OpenVisual = (A) => {
        return (
            `https://effectuall.github.io/Simulations/${A}.html`
        )
    }
//   const iframeSrc = `https://${url}`;

  return (
    <div className="container mx-auto p-4">
      <iframe
        src={OpenVisual(url.slice(1))}
        title="Webpage Viewer"
        className="w-full h-screen border-none"
        loading="lazy"
      />
    </div>
  );
}

export default webPage;
