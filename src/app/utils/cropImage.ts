export default function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<File> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.crossOrigin = 'anonymous'; // Needed for local image files
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject('Failed to get canvas context');
          return;
        }

        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        // Convert canvas to Blob and resolve it as a File
        canvas.toBlob(blob => {
          if (!blob) {
            reject('Canvas is empty');
            return;
          }
          const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
          resolve(file); // Return as a File object
        }, 'image/jpeg');
      };

      image.onerror = error => reject(error);
    });
}
