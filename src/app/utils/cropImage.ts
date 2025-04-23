'use client';
export default async function getCroppedImg(imageSrc: string, crop: any): Promise<File> {
    const image = new Image();
    image.src = imageSrc;
  
    await new Promise((resolve) => {
      image.onload = resolve;
    });
  
    const canvas = document.createElement('canvas');
    canvas.width = crop.width;
    canvas.height = crop.height;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
  
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );
  
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) throw new Error('Canvas is empty');
        const file = new File([blob], 'cropped.png', { type: 'image/png' });
        resolve(file);
      }, 'image/png');
    });
  }
  