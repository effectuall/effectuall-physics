import React from 'react';

const Panel = ({ files, onFileSelect, isOpen, togglePanel }) => {
  return (
    <>
    <button className={`md:hidden ${isOpen ? 'hidden' : 'block'}`} onClick={togglePanel}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <aside  className={`bg-gray-100 p-4 w-full md:w-1/4 h-screen overflow-y-auto ${isOpen ? 'block' : 'hidden md:block'}`}>
      <div className="mb-4 flex justify-between items-center md:hidden">
        <h2 className="text-xl font-bold">Simulations</h2>
        <button onClick={togglePanel}>Close</button>
      </div>
      <div>
        {Object.keys(files).map((category) => (
          <div key={category}>
            <h3 className="text-lg font-bold">{category}</h3>
            <ul>
              {files[category].map((file) => {
                const fileParts = file.split('_');
                fileParts.shift(); // Remove the first word
                const fileName = fileParts.join(' '); // Join the remaining words
                return (
                  <li key={file}>
                    <button
                      onClick={() => onFileSelect(file)}
                      className="block w-full text-left p-2 hover:bg-gray-200 rounded"
                    >
                      {fileName}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
    </>
    
  );
};

export default Panel;
