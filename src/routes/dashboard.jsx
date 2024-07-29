import React, { useState } from 'react';
import Header from '../components/header';
import Panel from '../components/panel';
import SimulationViewer from '../components/simulationViewer';
import files from '../assets/file.json';

const Route = () => {
  const [selectedFile, setSelectedFile] = useState('Optics_Compound_Microscope');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
    return (
      <div className="flex flex-col h-screen">      
      <div className="flex flex-grow">
        <Panel 
          files={files} 
          onFileSelect={handleFileSelect} 
          isOpen={isPanelOpen} 
          togglePanel={togglePanel}
        />
        <SimulationViewer selectedFile={selectedFile} />
      </div>
    </div>
    );
  };
  
  export default Route;