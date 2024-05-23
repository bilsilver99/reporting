import React, { useState } from "react";
import { Button, FileUploader } from "devextreme-react";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.value[0]);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onFileUpload(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <FileUploader
        selectButtonText="Select SQL File"
        multiple={false}
        accept=".sql"
        onValueChanged={handleFileChange}
      />
      <Button text="Upload" onClick={handleUpload} />
    </div>
  );
};

export default FileUpload;
