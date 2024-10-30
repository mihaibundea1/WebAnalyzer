import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { ZoomIn, ZoomOut, RotateCw, Maximize2 } from 'lucide-react';

// Restul codului XRayViewer rămâne la fel
const XRayViewer = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  // Mock data pentru imagini
  const mockImages = [
    { id: 1, url: '/api/placeholder/800/800', patientId: 'P001', date: '2024-03-15' },
    { id: 2, url: '/api/placeholder/800/800', patientId: 'P002', date: '2024-03-16' },
  ];

  // Modele AI disponibile
  const availableModels = [
    { id: 'densenet', name: 'DenseNet-121' },
    { id: 'resnet', name: 'ResNet-50' },
    { id: 'efficientnet', name: 'EfficientNet-B4' },
    { id: 'vit', name: 'Vision Transformer' }
  ];

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleModelSelect = (modelId) => {
    setSelectedModel(modelId);
  };

  const handleAnalyze = () => {
    // Aici va fi logica pentru analiza cu modelul selectat
    console.log(`Analizează folosind modelul: ${selectedModel}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar cu lista de imagini */}
      <div className="w-72 border-r bg-white p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Radiografii</h2>
        <div className="space-y-2">
          {mockImages.map((image) => (
            <Card 
              key={image.id}
              className={`cursor-pointer transition-all ${
                selectedImage?.id === image.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleImageSelect(image)}
            >
              <CardContent className="p-3">
                <img
                  src={image.url}
                  alt={`Patient ${image.patientId}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <div className="mt-2">
                  <p className="font-medium">Patient {image.patientId}</p>
                  <p className="text-sm text-gray-500">{image.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Zona principală de vizualizare */}
      <div className="flex-1 p-6">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Select value={selectedModel} onValueChange={handleModelSelect}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Selectează modelul AI" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map(model => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedModel && (
              <Button onClick={handleAnalyze}>
                Analizează
              </Button>
            )}
          </div>
        </div>

        {selectedImage ? (
          <Card className="relative">
            <CardContent className="p-4">
              {/* Toolbar pentru imagine */}
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 space-x-2">
                <Button variant="ghost" size="icon" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleRotate}>
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Container imagine */}
              <div className="flex justify-center items-center min-h-[600px] bg-gray-100 rounded-lg">
                <img
                  src={selectedImage.url}
                  alt={`Patient ${selectedImage.patientId}`}
                  className="max-w-full max-h-[600px] object-contain transition-transform duration-200"
                  style={{
                    transform: `scale(${zoom/100}) rotate(${rotation}deg)`
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-[600px] bg-gray-100 rounded-lg">
            <p className="text-gray-500">Selectează o radiografie pentru vizualizare</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default XRayViewer;