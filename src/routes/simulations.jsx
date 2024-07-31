import React from 'react';
import files from '../assets/file.json';

const Route = () => {
  const getName = (file) => {
    const name = file.split('_');
    name.shift();
    return name.join(' ');
  };

    return (
        <div id="row" className="container mx-auto"> 
       
        {Object.keys(files).map((key) => (
          <div key={key} className="mb-8">
            <a className="title block text-2xl font-bold mb-4">{key}</a>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {files[key].map((file) => (
                <div key={file} id={file} className="column p-2 shadow-lg">
                  <a href={`/dashboard/webpage/:${file}`}  rel="noopener noreferrer">
                    <img className="image w-full" src={`../assets/screenshots/${file}.jpg`} alt={getName(file)} loading="lazy" />
                    <div className="middle">
                      <div className="text">{getName(file)}</div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Route;