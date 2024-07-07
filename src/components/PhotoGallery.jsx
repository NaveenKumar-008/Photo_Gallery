import React from 'react';

const PhotoGallery = ({ photos, onEdit }) => {
  return (
    <div className="gallery">
      {photos.map((photo, index) => (
        <div key={index} className="photo">
          <img src={photo.preview} alt={`img-${index}`} />
          <button onClick={() => onEdit(photo)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
