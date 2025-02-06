"use client"

import React from "react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { ZoomIn, ZoomOut, RotateCw, Upload } from "lucide-react"

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => setImage(event.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => setImage(event.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleZoomIn = () => setZoom(zoom + 0.1)
  const handleZoomOut = () => setZoom(Math.max(0.1, zoom - 0.1))
  const handleRotate = () => setRotation(rotation + 90)

  return (
    <Card className="w-full h-full transition-all duration-300">
      <CardHeader className="md:flex-row md:items-center md:justify-between">
        <CardTitle>Upload Radiology Image</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleRotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
            Upload Image
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="relative flex justify-center items-center w-full bg-muted rounded-lg overflow-hidden"
          style={{ height: "calc(100vh - 300px)" }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {image ? (
            <img
              src={image || "/placeholder.svg"}
              alt="Uploaded"
              className="object-contain max-w-full max-h-full transition-transform duration-200 ease-in-out"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
            />
          ) : (
            <div className="text-muted-foreground text-center p-4">
              <Upload className="mx-auto mb-2 h-8 w-8" />
              <p className="text-sm">Drag and drop an image here or click to upload</p>
            </div>
          )}
        </div>
        <input type="file" onChange={handleFileChange} className="hidden" id="image-upload" accept="image/*" />
      </CardContent>
    </Card>
  )
}

export default ImageUpload

