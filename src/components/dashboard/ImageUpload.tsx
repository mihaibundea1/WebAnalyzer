import React, { useState } from 'react';
import { FaSearchPlus, FaSearchMinus, FaRedoAlt } from 'react-icons/fa';

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleZoomIn = () => setZoom(zoom + 0.1);
  const handleZoomOut = () => setZoom(zoom - 0.1);
  const handleRotate = () => setRotation(rotation + 90);

  return (
    <div className="flex flex-col items-center w-full h-[400px] bg-gray-50 border-2 border-dashed border-gray-400 rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Upload Radiology Image</h2>
      <div
        className="relative flex justify-center items-center w-full h-[250px] bg-gray-100 border-4 border-dashed border-gray-300 rounded-lg"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="object-contain max-w-full max-h-full"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
            }}
          />
        ) : (
          <div className="text-gray-500 text-center">Drag and drop an image here</div>
        )}
      </div>

      <div className="flex space-x-4 justify-center">
        <button
          onClick={handleZoomIn}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FaSearchPlus size={20} />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FaSearchMinus size={20} />
        </button>
        <button
          onClick={handleRotate}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FaRedoAlt size={20} />
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
