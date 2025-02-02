"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
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
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Upload Radiology Image</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div
          className="relative flex justify-center items-center w-full h-[calc(100vh-300px)] bg-muted rounded-lg overflow-hidden"
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
            <div className="text-muted-foreground text-center">
              <Upload className="mx-auto mb-2" />
              Drag and drop an image here or click to upload
            </div>
          )}
        </div>
        <input type="file" onChange={handleFileChange} className="hidden" id="image-upload" accept="image/*" />
        <div className="flex space-x-2">
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
      </CardContent>
    </Card>
  )
}

export default ImageUpload

