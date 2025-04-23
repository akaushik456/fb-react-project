'use client';
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import styles from './ImageCropper.module.css';

interface Props {
  imageSrc: string;
  onCropComplete: (croppedImage: File) => void;
}

export default function ImageCropper({ imageSrc, onCropComplete }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropCompleteHandler = useCallback((_area: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const onCropDone = async () => {
    try {
      if (!croppedAreaPixels) {
        throw new Error('No cropping area selected');
      }

      // Get the cropped image from the original
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);

      // Pass it to parent component
      onCropComplete(croppedImage);
    } catch (e) {
      console.error('Cropping failed', e);
    }
  };

  return (
    <div id="1" style={{ position: 'relative', width: '100%', height: 400 }}>
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
        style={{ width: '100%', marginTop: '10px', position: 'absolute' }}
      />

      <button className={styles.nextButton} onClick={onCropDone} style={{ marginTop: 20 }}>
        Next
      </button>
    </div>
  );
}
