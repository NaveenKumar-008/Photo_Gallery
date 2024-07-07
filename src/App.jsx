import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import PhotoGallery from './components/PhotoGallery';
import ImageEditor from './components/ImageEditor';
import './styles.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleUpload = (newPhotos) => {
    setPhotos([...photos, ...newPhotos]);
  };

  const handleEdit = (photo) => {
    console.log("Editing photo:", photo); // Debugging log
    setSelectedPhoto(photo);
  };

  const handleSave = (editedPhoto) => {
    setPhotos(photos.map(photo => (photo === selectedPhoto ? editedPhoto : photo)));
    setSelectedPhoto(null);
  };

  return (
    <div className="App">
      <h1>Photo Gallery App</h1>
      <ImageUploader onUpload={handleUpload} />
      <PhotoGallery photos={photos} onEdit={handleEdit} />
      {selectedPhoto && <ImageEditor photo={selectedPhoto} onSave={handleSave} />}
    </div>
  );
}

export default App;
