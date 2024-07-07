import React from 'react';
import { useDropzone } from 'react-dropzone';
import "./ImageUploader.css";

const ImageUploader = ({ onUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      onUpload(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  return (
    <div className="uploader" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default ImageUploader;
