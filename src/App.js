import React, { useState } from 'react';
import './App.css';
import UploadButton from './components/UploadButton';
import cat from "./cat.png";
import dog from "./dog.png";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileSelect = async (file) => {
    setSelectedFile(URL.createObjectURL(file));
    await predictImage(file);
  };

  const predictImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Prediction failed');
      }
      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  return (
    <div className="app">
      {selectedFile ? (
        <>
          <p className='result'>{prediction ? (prediction.class === 1 ? "BoW wOw! I'm a Dog." : "MeoW! I'm a Cat.") : "Predicting..."}</p>
          <div>
            <img className='selectedImage' src={selectedFile} alt="Selected file" />
          </div>
        </>
      ) : (
        <>
          <div>
            <img className='anImage cat' src={cat} alt="Cat" />
            <img className='anImage dog' src={dog} alt="Dog" />
          </div>
          <p>Cat-V-Dog Classifier</p>
          <UploadButton onFileSelect={handleFileSelect} />
        </>
      )}
    </div>
  );
}

export default App;
