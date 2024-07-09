import React from "react";
import "../components/components.css";
import fileicon from "./fileupload.png";

const UploadButton = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('file').click();
  };

  return (
    <div className="bttn-div">
      <input 
        type="file" 
        id="file" 
        style={{ display: "none" }} 
        onChange={handleFileChange} 
      />
      <button onClick={handleButtonClick} className="uploadBttn">
        <img src={fileicon} alt="Upload icon" />
        <p>Upload</p>
      </button>
    </div>
  );
}

export default UploadButton;
