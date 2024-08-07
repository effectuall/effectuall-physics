import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Problemcard from '../components/problemCard';
import problems from '../assets/problems.json';

function visualPage() {
  const { url } = useParams();  // Get the URL parameter from the route
  console.log(url);

  const OpenVisual = (A) => {
    return (
      `https://effectuall.github.io/Simulations/${A}.html`
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="md:w-1/4 w-full md:mb-0 mb-4">
        {problems.filter(problem => problem.title === url.slice(1)).map((A, index) => {
          return (
            <Problemcard key={A._id} problem={A.id} index={index} />
          );
        })}
      </div>
      <div className="md:w-3/4 w-full">
        <iframe
          src={OpenVisual(url.slice(1))}
          title="Webpage Viewer"
          className="w-full h-[500px] md:h-[600px] border-none"
          loading="lazy"
        />

      </div>
    </div>
  );
}



export default visualPage;

