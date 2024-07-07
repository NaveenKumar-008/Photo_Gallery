import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ImageFilter from 'react-image-filter';
import "./ImageEditor.css";

const ImageEditor = ({ photo, onSave }) => {
  const [crop, setCrop] = useState({ aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [filter, setFilter] = useState(0);
  const imgRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    console.log("Photo to edit:", photo);
  }, [photo]);

  const onImageLoaded = (image) => {
    imgRef.current = image;
  };

  const applyFilter = (canvas, ctx) => {
    ctx.filter = getFilter(filter);
  };

  const getFilter = (filter) => {
    switch (filter) {
      case 1:
        return 'grayscale(100%)';
      case 2:
        return 'sepia(100%)';
      case 3:
        return 'blur(5px)';
      case 4:
        return 'brightness(150%)';
      case 5:
        return 'contrast(200%)';
      default:
        return 'none';
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    applyFilter(canvas, ctx);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const newPhoto = new File([blob], photo.name, { type: 'image/jpeg' });
        newPhoto.preview = URL.createObjectURL(blob);
        resolve(newPhoto);
      }, 'image/jpeg');
    });
  };

  const handleSave = async () => {
    if (!completedCrop || !imgRef.current) {
      onSave(photo);
      return;
    }

    const croppedImage = await getCroppedImg(imgRef.current, completedCrop);
    setCroppedImage(croppedImage);
    onSave(croppedImage);
  };

  return (
    <div className="editor">
      <ReactCrop
        src={photo.preview}
        crop={crop}
        onImageLoaded={onImageLoaded}
        onChange={setCrop}
        onComplete={(c) => setCompletedCrop(c)}
      />
      {croppedImage && (
        <ImageFilter image={croppedImage.preview} filter={filter} />
      )}
      <div className="controls">
        <label>Filter: 
          <input
            type="range"
            min="0"
            max="5"
            value={filter}
            onChange={(e) => setFilter(Number(e.target.value))}
          />
        </label>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ImageEditor;
