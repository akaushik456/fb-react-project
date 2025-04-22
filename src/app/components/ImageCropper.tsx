// components/ImageCropper.tsx
'use client';
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import styles from './ImageCropper.module.css'

interface Props {
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
}

export default function ImageCropper({ imageSrc, onCropComplete }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropDone = async () => {
    try {
      if (!croppedAreaPixels) {
        throw new Error('No cropping area selected');
      }
      console.log('image croped')
      // Get the cropped image from the file
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const onCropComplete = (croppedImage: File) => {
        // ❌ nothing here or throws "Function not implemented"
      };
    } catch (e) {
      console.error('Cropping failed', e);
    }
  };
  const onCropCompleteHandler = useCallback((_area: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: 400 }}>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropCompleteHandler}
      />

        <input
        type="range"
        min={1}
        max={3}
        step={0.1}
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
        style={{ width: '100%', marginTop: '10', position:'absolute' }}
            />
      <button className={styles.nextButton} onClick={onCropDone} style={{ marginTop: 20 }}>Next</button>
    </div>
  );
}
